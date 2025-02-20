import { OrderSchema } from './order.schema';
import { 
  IOrder, 
  IOrderDocument, 
  ICreateOrderRequest, 
  OrderStatus 
} from './order.model';
import mongoose from 'mongoose';
import { OrderItem } from '../orderItem/orderItem.schema';

interface OrderFilters {
  status?: OrderStatus;
  trackingNumber?: string;
  startDate?: Date;
  endDate?: Date;
}

interface OrderStats {
  total: number;
  totalDelivered: number;
  totalPending: number;
  totalInTransit: number;
  totalCancelled: number;
  totalFailedDelivery: number;
  todayOrders: number;
  todayDelivered: number;
  revenue: {
    total: number;
    today: number;
  };
}

export class OrderCrud {
  async createOrder(userId: string, orderData: ICreateOrderRequest): Promise<IOrder> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create order
      const order = await OrderSchema.create([{
        ...orderData,
        userId
      }], { session });

      // Create order items
      const orderItems = await OrderItem.create(
        orderData.items.map(item => ({
          orderId: order[0]._id,
          productId: item.productId,
          storeId: item.storeId,
          quantity: item.quantity,
          price: item.price,
          variantData: item.variantData,
          name: item.name,
          description: item.description
        })),
        { session }
      );

      await session.commitTransaction();
      return this.toOrderResponse({ ...order[0].toObject(), items: orderItems });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async findUserOrders(userId: string): Promise<IOrder[]> {
    try {
      const orders = await OrderSchema.find({ userId })
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .sort({ createdAt: -1 })
        .exec();
      return orders.map(order => this.toOrderResponse(order));
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, userId: string): Promise<IOrder | null> {
    try {
      const order = await OrderSchema.findOne({ _id: id, userId })
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .exec();
      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findByTrackingNumber(trackingNumber: string): Promise<IOrder | null> {
    try {
      const order = await OrderSchema.findOne({ trackingNumber })
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .exec();
      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateOrderStatus(
    id: string, 
    userId: string, 
    status: OrderStatus
  ): Promise<IOrder | null> {
    try {
      const order = await OrderSchema.findOneAndUpdate(
        { _id: id, userId },
        { 
          status,
          ...(status === 'PICKED_UP' && { pickupDate: new Date() }),
          ...(status === 'DELIVERED' && { deliveryDate: new Date() })
        },
        { new: true }
      )
      .populate('pickupAddress')
      .populate('deliveryAddress')
      .exec();
      
      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(id: string, userId: string): Promise<IOrder | null> {
    try {
      const order = await OrderSchema.findOneAndUpdate(
        { 
          _id: id, 
          userId,
          status: 'PENDING' // Can only cancel pending orders
        },
        { status: 'CANCELLED' },
        { new: true }
      )
      .populate('pickupAddress')
      .populate('deliveryAddress')
      .exec();
      
      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async adminUpdateOrderStatus(
    orderId: string, 
    status: OrderStatus, 
    notes?: string
  ): Promise<IOrder | null> {
    try {
      const order = await OrderSchema.findByIdAndUpdate(
        orderId,
        { 
          $set: { 
            status,
            statusNotes: notes 
          } 
        },
        { new: true }
      )
      .populate('pickupAddress')
      .populate('deliveryAddress')
      .exec();
      
      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      throw error;
    }
  }

  async findAllOrders(
    page: number, 
    limit: number, 
    filters: OrderFilters = {}
  ): Promise<{ orders: IOrder[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const query: any = {};

      // Add status filter
      if (filters.status) {
        query.status = filters.status;
      }

      // Add tracking number filter
      if (filters.trackingNumber) {
        query.trackingNumber = new RegExp(filters.trackingNumber, 'i');
      }

      // Add date range filter
      if (filters.startDate || filters.endDate) {
        query.createdAt = {};
        if (filters.startDate) {
          query.createdAt.$gte = filters.startDate;
        }
        if (filters.endDate) {
          query.createdAt.$lte = filters.endDate;
        }
      }
      
      const [orders, total] = await Promise.all([
        OrderSchema.find(query)
          .populate('pickupAddress')
          .populate('deliveryAddress')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        OrderSchema.countDocuments(query)
      ]);

      return {
        orders: orders.map(order => this.toOrderResponse(order)),
        total
      };
    } catch (error) {
      throw error;
    }
  }

  async getOrderStats(): Promise<OrderStats> {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [
        total,
        totalDelivered,
        totalPending,
        totalInTransit,
        totalCancelled,
        totalFailedDelivery,
        todayOrders,
        todayDelivered,
        revenue,
        todayRevenue
      ] = await Promise.all([
        OrderSchema.countDocuments(),
        OrderSchema.countDocuments({ status: 'DELIVERED' }),
        OrderSchema.countDocuments({ status: 'PENDING' }),
        OrderSchema.countDocuments({ status: 'IN_TRANSIT' }),
        OrderSchema.countDocuments({ status: 'CANCELLED' }),
        OrderSchema.countDocuments({ status: 'FAILED_DELIVERY' }),
        OrderSchema.countDocuments({ createdAt: { $gte: today } }),
        OrderSchema.countDocuments({ 
          status: 'DELIVERED',
          deliveryDate: { $gte: today }
        }),
        OrderSchema.aggregate([
          { $match: { status: 'DELIVERED' } },
          { $group: { _id: null, total: { $sum: '$price' } } }
        ]),
        OrderSchema.aggregate([
          { 
            $match: { 
              status: 'DELIVERED',
              deliveryDate: { $gte: today }
            }
          },
          { $group: { _id: null, total: { $sum: '$price' } } }
        ])
      ]);

      return {
        total,
        totalDelivered,
        totalPending,
        totalInTransit,
        totalCancelled,
        totalFailedDelivery,
        todayOrders,
        todayDelivered,
        revenue: {
          total: revenue[0]?.total || 0,
          today: todayRevenue[0]?.total || 0
        }
      };
    } catch (error) {
      throw error;
    }
  }

  private toOrderResponse(order: IOrderDocument): IOrder {
    const orderObject = order.toObject();
    return {
      ...orderObject,
      _id: orderObject._id.toString(),
      userId: orderObject.userId.toString(),
      pickupAddress: typeof orderObject.pickupAddress === 'object' ? 
        { ...orderObject.pickupAddress, _id: orderObject.pickupAddress._id.toString() } :
        orderObject.pickupAddress.toString(),
      deliveryAddress: typeof orderObject.deliveryAddress === 'object' ?
        orderObject.deliveryAddress : // Keep manual address as is
        orderObject.deliveryAddress.toString() // Convert ObjectId to string
    } as IOrder;
  }
}