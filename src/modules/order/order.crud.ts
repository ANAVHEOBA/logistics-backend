import { OrderSchema } from './order.schema';
import { 
  IOrder, 
  IOrderDocument, 
  ICreateOrderRequest, 
  ICreateGuestOrderRequest,
  OrderStatus,
  IOrderItemBase,
  IConsumerOrderRequest,
  PaymentStatus,
  PaymentMethod,
  PackageSize,
  IConsumerOrdersQuery
} from './order.model';
import { OrderItem } from '../orderItem/orderItem.schema';
import mongoose, { Model } from 'mongoose';
import { ProductCrud } from '../product/product.crud';
import { randomBytes } from 'crypto';
import { NotificationService } from '../../services/notification.service';

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

interface OrderAnalytics {
  totalOrders: number;
  ordersByStatus: Record<OrderStatus, number>;
  averageOrderValue: number;
  orderFrequency: {
    daily: number;
    weekly: number;
    monthly: number;
  };
  packageSizeDistribution: Record<PackageSize, number>;
  deliveryMetrics: {
    successRate: number;
    averageDeliveryTime: number;
    expressDeliveryCount: number;
  };
}

interface SpendingAnalytics {
  totalSpent: number;
  monthlySpending: Array<{
    month: string;
    amount: number;
    orderCount: number;
  }>;
  averageMonthlySpend: number;
  paymentMethods: Array<{
    method: PaymentMethod;
    count: number;
    total: number;
  }>;
  deliveryFees: {
    total: number;
    average: number;
  };
}

export class OrderCrud {
  private productCrud: ProductCrud;
  private model: Model<any>; // Define the model property

  constructor() {
    this.productCrud = new ProductCrud();
    this.model = OrderSchema; // Assign the Mongoose model to the model property
  }

  // Add this private method to generate payment reference
  private generatePaymentReference(): string {
    // Generate a random string of 8 characters
    const randomString = randomBytes(4).toString('hex').toUpperCase();
    // Add timestamp to ensure uniqueness
    const timestamp = Date.now().toString(36).toUpperCase();
    return `PAY-${timestamp}-${randomString}`;
  }

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
          status: 'PENDING'
        })),
        { session }
      );

      // Convert the order items to the expected format
      const formattedItems = orderItems.map(item => ({
        productId: item.productId.toString(),
        storeId: item.storeId.toString(),
        quantity: item.quantity,
        price: item.price,
        variantData: item.variantData,
        name: item.name
      }));

      // Create a proper IOrderDocument
      const orderDoc = order[0];
      const orderWithItems = {
        ...orderDoc.toObject(),
        items: formattedItems
      };

      await session.commitTransaction();
      
      // Send notification after successful order creation
      await NotificationService.sendNewOrderNotification(this.toOrderResponse(orderDoc));
      
      return this.toOrderResponse(orderDoc);
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

  async findById(id: string, userId?: string): Promise<IOrder | null> {
    try {
      const query: any = { _id: id };
      if (userId) {
        query.userId = userId;
      }
      
      const order = await OrderSchema.findOne(query)
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .populate({
          path: 'userId',
          select: 'firstName lastName email phone'
        })
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
      const oldOrder = await OrderSchema.findOne({ _id: id, userId });
      if (!oldOrder) return null;

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
      
      if (order) {
        const orderResponse = this.toOrderResponse(order);
        await NotificationService.sendOrderStatusChangeNotification(
          orderResponse,
          oldOrder.status,
          status
        );
        return orderResponse;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async cancelOrder(id: string, userId: string): Promise<IOrder | null> {
    try {
      const oldOrder = await OrderSchema.findOne({ _id: id, userId });
      if (!oldOrder) return null;

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
      
      if (order) {
        const orderResponse = this.toOrderResponse(order);
        await NotificationService.sendOrderStatusChangeNotification(
          orderResponse,
          oldOrder.status,
          'CANCELLED'
        );
        return orderResponse;
      }
      return null;
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
      const oldOrder = await OrderSchema.findById(orderId);
      if (!oldOrder) return null;

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
      
      if (order) {
        const orderResponse = this.toOrderResponse(order);
        
        // Send notifications based on status
        if (status === 'READY_FOR_PICKUP') {
          await NotificationService.sendReadyForPickupNotification(orderResponse);
        } else {
          await NotificationService.sendOrderStatusChangeNotification(
            orderResponse,
            oldOrder.status,
            status
          );
        }
        
        return orderResponse;
      }
      return null;
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
          .populate({
            path: 'userId',
            select: 'firstName lastName'
          })
          .populate({
            path: 'items.storeId',
            select: 'storeName'
          })
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

  async createGuestOrder(orderData: ICreateGuestOrderRequest): Promise<IOrder> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Ensure addresses are properly formatted
      const orderWithAddresses = {
        ...orderData,
        pickupAddress: {
          ...orderData.pickupAddress,
          recipientName: orderData.pickupAddress.recipientName,
          recipientPhone: orderData.pickupAddress.recipientPhone
        },
        deliveryAddress: {
          ...orderData.deliveryAddress,
          recipientName: orderData.deliveryAddress.recipientName,
          recipientPhone: orderData.deliveryAddress.recipientPhone
        },
        status: 'PENDING',
        packageSize: orderData.packageSize || 'SMALL',
        isFragile: orderData.isFragile || false,
        isExpressDelivery: orderData.isExpressDelivery || false,
        requiresSpecialHandling: orderData.requiresSpecialHandling || false,
        estimatedDeliveryDate: this.calculateEstimatedDeliveryDate(orderData.isExpressDelivery || false)
      };

      // Create order with guest info
      const order = await OrderSchema.create([orderWithAddresses], { session });

      // Create order items with all required fields
      const orderItems = await OrderItem.create(
        orderData.items.map((item: IOrderItemBase) => ({
          orderId: order[0]._id,
          productId: item.productId,
          storeId: item.storeId,
          quantity: item.quantity,
          price: item.price,
          name: item.name, // Use the name directly from the item
          variantData: item.variantData,
          status: 'PENDING'
        })),
        { session }
      );

      // Format the items for the order response
      const formattedItems = orderItems.map(item => ({
        productId: item.productId.toString(),
        storeId: item.storeId.toString(),
        quantity: item.quantity,
        price: item.price,
        name: item.name,
        variantData: item.variantData
      }));

      // Update the order with formatted items
      const orderDoc = order[0];
      orderDoc.items = formattedItems;

      // Save the updated order
      await orderDoc.save({ session });

      // Commit transaction
      await session.commitTransaction();
      
      // Send notification after successful guest order creation
      await NotificationService.sendNewOrderNotification(this.toOrderResponse(orderDoc));
      
      return this.toOrderResponse(orderDoc);
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      throw error;
    } finally {
      await session.endSession();
    }
  }

  private calculateEstimatedDeliveryDate(isExpressDelivery: boolean): Date {
    const date = new Date();
    date.setDate(date.getDate() + (isExpressDelivery ? 1 : 3)); // Express delivery is 1 day, standard is 3 days
    return date;
  }

  async createConsumerOrder(
    consumerId: string,
    storeId: string,
    orderData: IConsumerOrderRequest,
    zoneId?: string,
    zonePrice?: number
  ): Promise<IOrder> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Calculate product total from the items array
      const productTotal = orderData.items.reduce((sum, item) => {
        const itemPrice = item.price || 0;
        return sum + (itemPrice * item.quantity);
      }, 0);

      // Calculate final price
      const totalPrice = orderData.totalPrice || (zonePrice ? productTotal + zonePrice : productTotal);

      // Create the order
      const order = await OrderSchema.create([{
        userId: consumerId,
        storeId: storeId,
        items: orderData.items.map(item => ({
          productId: item.productId,
          storeId: storeId,
          quantity: item.quantity,
          price: item.price || 0,
          variantData: item.variantData
        })),
        pickupAddress: orderData.pickupAddress,
        deliveryAddress: orderData.deliveryAddress.manualAddress,
        packageSize: orderData.packageSize,
        isFragile: orderData.isFragile || false,
        isExpressDelivery: orderData.isExpressDelivery || false,
        requiresSpecialHandling: orderData.requiresSpecialHandling || false,
        specialInstructions: orderData.specialInstructions,
        status: 'PENDING',
        price: totalPrice, // Use the calculated total price
        paymentMethod: orderData.paymentMethod,
        paymentStatus: 'PENDING',
        paymentReference: orderData.paymentReference,
        deliveryZone: zoneId ? new mongoose.Types.ObjectId(zoneId) : undefined,
        zonePrice: zonePrice || 0,
        estimatedDeliveryDate: this.calculateEstimatedDeliveryDate(orderData.isExpressDelivery || false)
      }], { session });

      await session.commitTransaction();
      
      // Send notification after successful consumer order creation
      await NotificationService.sendNewOrderNotification(this.toOrderResponse(order[0]));
      
      return this.toOrderResponse(order[0]);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  private toOrderResponse(order: IOrderDocument): any {
    const orderObject = order.toObject();
    
    // Calculate total product price
    const productTotal = orderObject.items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);

    const deliveryFee = orderObject.zonePrice || 0;

    // Handle consumer information
    let consumerInfo = null;
    if (orderObject.userId) {
      if (typeof orderObject.userId === 'object') {
        consumerInfo = {
          name: `${orderObject.userId.firstName} ${orderObject.userId.lastName}`,
          email: orderObject.userId.email,
          phone: orderObject.userId.phone,
          isGuest: false
        };
      }
    } else if (orderObject.guestInfo) {
      consumerInfo = {
        name: `${orderObject.guestInfo.firstName} ${orderObject.guestInfo.lastName}`,
        email: orderObject.guestInfo.email,
        phone: orderObject.guestInfo.phone,
        isGuest: true
      };
    }

    return {
      ...orderObject,
      _id: orderObject._id.toString(),
      consumer: consumerInfo,
      pickupAddress: orderObject.pickupAddress ? (
        typeof orderObject.pickupAddress === 'object' ? 
          orderObject.pickupAddress : // Keep manual address as is for guest orders
          orderObject.pickupAddress.toString() // Convert ObjectId to string for user orders
      ) : undefined,
      deliveryAddress: orderObject.deliveryAddress ? (
        typeof orderObject.deliveryAddress === 'object' ? 
          orderObject.deliveryAddress : // Keep manual address as is
          orderObject.deliveryAddress.toString() // Convert ObjectId to string
      ) : undefined,
      items: orderObject.items.map((item: IOrderItemBase & { productId: any; storeId: any }) => ({
        ...item,
        productId: typeof item.productId === 'object' ? item.productId.toString() : item.productId,
        storeId: typeof item.storeId === 'object' ? {
          _id: item.storeId._id.toString(),
          storeName: item.storeId.storeName
        } : item.storeId
      })),
      priceBreakdown: {
        productTotal,
        deliveryFee,
        total: orderObject.price
      }
    };
  }

  async findConsumerOrders(
    consumerId: string,
    query: IConsumerOrdersQuery = {}
  ): Promise<{ orders: IOrder[]; total: number }> {
    try {
      const page = query.page || 1;
      const limit = query.limit || 10;
      const skip = (page - 1) * limit;

      // Build the filter object
      const filter: any = { userId: consumerId };
      
      // Add status filter if provided
      if (query.status) {
        filter.status = query.status;
      }

      // Add date range filter if provided
      if (query.startDate || query.endDate) {
        filter.createdAt = {};
        if (query.startDate) {
          filter.createdAt.$gte = query.startDate;
        }
        if (query.endDate) {
          filter.createdAt.$lte = query.endDate;
        }
      }

      const [orders, total] = await Promise.all([
        OrderSchema.find(filter)
          .populate('pickupAddress')
          .populate('deliveryAddress')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .exec(),
        OrderSchema.countDocuments(filter)
      ]);

      return {
        orders: orders.map(order => this.toOrderResponse(order)),
        total
      };
    } catch (error) {
      throw error;
    }
  }

  public async findConsumerOrderById(orderId: string, consumerId: string): Promise<IOrder | null> {
    try {
      const order = await OrderSchema.findOne({ 
        _id: orderId, 
        userId: consumerId 
      })
      .populate('pickupAddress')
      .populate('deliveryAddress')
      .exec();

      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      console.error('Find consumer order by id error:', error);
      throw error;
    }
  }

  public async cancelConsumerOrder(orderId: string, consumerId: string): Promise<any | null> {
    return this.model.findOneAndUpdate(
      { _id: orderId, consumerId },
      { status: 'CANCELLED' },
      { new: true }
    );
  }

  async updatePaymentReceipt(
    orderId: string,
    consumerId: string,
    receiptUrl: string
  ): Promise<IOrder | null> {
    return this.model.findOneAndUpdate(
      { _id: orderId, userId: consumerId },
      { 
        $push: { 
          paymentReceipts: {
            url: receiptUrl,
            uploadedAt: new Date()
          }
        },
        paymentStatus: 'PENDING' 
      },
      { new: true }
    );
  }

  async findOrdersByPaymentStatus(
    status: PaymentStatus,
    page: number,
    limit: number
  ): Promise<{ orders: IOrder[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = { paymentStatus: status };

    const [orders, total] = await Promise.all([
      this.model.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.model.countDocuments(query)
    ]);

    return { orders, total };
  }

  async updatePaymentStatus(
    orderId: string,
    status: PaymentStatus,
    notes?: string,
    adminId?: string
  ): Promise<IOrder | null> {
    const update: any = {
      paymentStatus: status,
      paymentNotes: notes
    };

    if (status === 'VERIFIED') {
      update.paymentDate = new Date();
      update.verifiedBy = adminId;
    }

    return this.model.findByIdAndUpdate(
      orderId,
      update,
      { new: true }
    );
  }

  async getConsumerPaymentUpdates(consumerId: string): Promise<IOrder[]> {
    try {
      const orders = await this.model.find({ 
        consumerId,
        paymentStatus: { $in: ['PENDING', 'VERIFIED', 'FAILED'] }
      })
      .sort({ updatedAt: -1 })
      .limit(10)
      .exec();

      return orders.map(order => this.toOrderResponse(order));
    } catch (error) {
      throw error;
    }
  }

  async findOrdersByStatus(
    status: OrderStatus,
    page: number,
    limit: number
  ): Promise<{ orders: IOrder[]; total: number }> {
    const skip = (page - 1) * limit;
    const query = { status };

    const [orders, total] = await Promise.all([
      OrderSchema.find(query)
        .populate('pickupAddress')
        .populate('deliveryAddress')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      OrderSchema.countDocuments(query)
    ]);

    return {
      orders: orders.map(order => this.toOrderResponse(order)),
      total
    };
  }

  async markOrderPayment(orderId: string, consumerId: string, paymentDetails: {
    paymentMethod: PaymentMethod;
    paymentReference: string;
    amount: number;
  }): Promise<IOrder | null> {
    try {
      // First find the order to verify it exists and belongs to the consumer
      const existingOrder = await this.model.findOne({ 
        _id: orderId, 
        userId: consumerId 
      });

      if (!existingOrder) {
        return null;
      }

      const order = await this.model.findOneAndUpdate(
        { _id: orderId, userId: consumerId },
        { 
          $set: {
            paymentStatus: 'PENDING',
            paymentMethod: paymentDetails.paymentMethod,
            paymentReference: paymentDetails.paymentReference,
            paymentAmount: paymentDetails.amount,
            paymentDate: new Date()
          },
          $push: {
            paymentHistory: {
              status: 'PENDING',
              date: new Date(),
              reference: paymentDetails.paymentReference,
              amount: paymentDetails.amount
            }
          }
        },
        { new: true }
      )
      .populate({
        path: 'userId',
        select: 'firstName lastName email'
      })
      .populate('pickupAddress')
      .populate('deliveryAddress');

      return order ? this.toOrderResponse(order) : null;
    } catch (error) {
      console.error('Mark order payment error:', error);
      throw error;
    }
  }

  async getConsumerOrderAnalytics(
    consumerId: string,
    timeframe: string
  ): Promise<OrderAnalytics> {
    const timeFilter = this.getTimeframeFilter(timeframe);
    const match = {
      userId: new mongoose.Types.ObjectId(consumerId),
      status: 'CONFIRMED',  // Changed from paymentStatus: 'VERIFIED'
      createdAt: timeFilter
    };

    const [orderStats, deliveryStats] = await Promise.all([
      this.model.aggregate([
        { $match: match },
        {
          $lookup: {
            from: 'stores',
            localField: 'items.storeId',
            foreignField: '_id',
            as: 'storeDetails'
          }
        },
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalAmount: { $sum: '$price' },
            packageSizes: { $push: '$packageSize' },
            expressDeliveryCount: {
              $sum: { $cond: ['$isExpressDelivery', 1, 0] }
            },
            storeName: { $first: { $arrayElemAt: ['$storeDetails.storeName', 0] } }
          }
        }
      ]),
      this.model.aggregate([
        { $match: { ...match, status: 'DELIVERED' } },
        {
          $group: {
            _id: null,
            deliveredCount: { $sum: 1 },
            avgDeliveryTime: {
              $avg: {
                $subtract: ['$deliveryDate', '$createdAt']
              }
            }
          }
        }
      ])
    ]);

    const orderStatusCounts = await this.model.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const stats = orderStats[0] || { 
      totalOrders: 0, 
      totalAmount: 0,
      packageSizes: [],
      expressDeliveryCount: 0
    };

    const deliveryMetrics = deliveryStats[0] || {
      deliveredCount: 0,
      avgDeliveryTime: 0
    };

    const packageSizeDistribution = stats.packageSizes.reduce((acc: any, size: PackageSize) => {
      acc[size] = (acc[size] || 0) + 1;
      return acc;
    }, {});

    return {
      totalOrders: stats.totalOrders,
      ordersByStatus: orderStatusCounts.reduce((acc: any, curr) => {
        acc[curr._id] = curr.count;
        return acc;
      }, {}),
      averageOrderValue: stats.totalOrders ? stats.totalAmount / stats.totalOrders : 0,
      orderFrequency: this.calculateOrderFrequency(stats.totalOrders, timeframe),
      packageSizeDistribution,
      deliveryMetrics: {
        successRate: stats.totalOrders ? 
          (deliveryMetrics.deliveredCount / stats.totalOrders) * 100 : 0,
        averageDeliveryTime: deliveryMetrics.avgDeliveryTime / (1000 * 60 * 60 * 24), // Convert to days
        expressDeliveryCount: stats.expressDeliveryCount
      }
    };
  }

  async getConsumerSpendingAnalytics(
    consumerId: string,
    period: string
  ): Promise<SpendingAnalytics> {
    try {
      const monthsToLookBack = this.getPeriodMonths(period);
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - monthsToLookBack);

      const spendingData = await this.model.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(consumerId),
            status: 'CONFIRMED',  // Changed from paymentStatus: 'VERIFIED'
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' }
            },
            totalSpent: { $sum: '$price' },
            orderCount: { $sum: 1 },
            deliveryFees: { $sum: '$zonePrice' },
            paymentMethods: { $push: '$paymentMethod' }
          }
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } }
      ]);

      const paymentMethodStats = await this.model.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(consumerId),
            status: 'CONFIRMED',  // Changed from paymentStatus: 'VERIFIED'
            createdAt: { $gte: startDate }
          }
        },
        {
          $group: {
            _id: '$paymentMethod',
            count: { $sum: 1 },
            total: { $sum: '$price' }
          }
        }
      ]);

      const monthlySpending = spendingData.map(month => ({
        month: `${month._id.year}-${month._id.month.toString().padStart(2, '0')}`,
        amount: month.totalSpent,
        orderCount: month.orderCount
      }));

      const totalSpent = monthlySpending.reduce((sum, month) => sum + month.amount, 0);

      return {
        totalSpent,
        monthlySpending,
        averageMonthlySpend: totalSpent / monthlySpending.length || 0,
        paymentMethods: paymentMethodStats.map(method => ({
          method: method._id,
          count: method.count,
          total: method.total
        })),
        deliveryFees: {
          total: spendingData.reduce((sum, month) => sum + month.deliveryFees, 0),
          average: spendingData.reduce((sum, month) => sum + month.deliveryFees, 0) / 
            spendingData.length || 0
        }
      };
    } catch (error) {
      console.error('Get consumer spending analytics error:', error);
      throw error;
    }
  }

  private getTimeframeFilter(timeframe: string): any {
    const now = new Date();
    switch (timeframe) {
      case 'week':
        return { $gte: new Date(now.setDate(now.getDate() - 7)) };
      case 'month':
        return { $gte: new Date(now.setMonth(now.getMonth() - 1)) };
      case 'year':
        return { $gte: new Date(now.setFullYear(now.getFullYear() - 1)) };
      default:
        return {}; // All time
    }
  }

  private getPeriodMonths(period: string): number {
    switch (period) {
      case '3months': return 3;
      case '6months': return 6;
      case '1year': return 12;
      default: return 6;
    }
  }

  private calculateOrderFrequency(totalOrders: number, timeframe: string): {
    daily: number;
    weekly: number;
    monthly: number;
  } {
    let days: number;
    switch (timeframe) {
      case 'week': days = 7; break;
      case 'month': days = 30; break;
      case 'year': days = 365; break;
      default: days = 365; // Default to yearly calculation
    }

    const daily = totalOrders / days;
    return {
      daily,
      weekly: daily * 7,
      monthly: daily * 30
    };
  }
}