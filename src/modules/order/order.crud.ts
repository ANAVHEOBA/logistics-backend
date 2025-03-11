import { OrderSchema } from './order.schema';
import { 
  IOrder, 
  IOrderDocument, 
  ICreateOrderRequest, 
  ICreateGuestOrderRequest,
  OrderStatus,
  IOrderItemBase,
  IConsumerOrderRequest
} from './order.model';
import { OrderItem } from '../orderItem/orderItem.schema';
import mongoose, { Model } from 'mongoose';
import { ProductCrud } from '../product/product.crud';

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
  private productCrud: ProductCrud;
  private model: Model<any>; // Define the model property

  constructor() {
    this.productCrud = new ProductCrud();
    this.model = OrderSchema; // Assign the Mongoose model to the model property
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
          status: 'PENDING' // Add default status
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
      
      // Return the order response
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
      // 1. Reserve product stock
      for (const item of orderData.items) {
        const success = await this.productCrud.reserveProductStock(
          item.productId,
          item.quantity
        );
        if (!success) {
          throw new Error(`Failed to reserve stock for product ${item.productId}`);
        }
      }

      // 2. Get product details and calculate prices
      const productDetails = await Promise.all(
        orderData.items.map(item => 
          this.productCrud.getProductById(item.productId)
        )
      );

      // 3. Create order items with product details
      const orderItems = orderData.items.map((item, index) => ({
        productId: item.productId,
        storeId: storeId,
        quantity: item.quantity,
        price: productDetails[index]!.price * item.quantity,
        name: productDetails[index]!.name,
        variantData: item.variantData
      }));

      // Calculate product total
      const productTotal = orderItems.reduce((sum, item) => sum + item.price, 0);
      
      // Add zone price to total if applicable
      const totalPrice = zonePrice ? productTotal + zonePrice : productTotal;

      // 4. Create the order with proper address handling and zone information
      const order = await OrderSchema.create([{
        userId: consumerId,
        storeId: storeId,
        items: orderItems,
        pickupAddress: orderData.pickupAddress.manualAddress,
        deliveryAddress: orderData.deliveryAddress.manualAddress,
        isExpressDelivery: orderData.isExpressDelivery || false,
        specialInstructions: orderData.specialInstructions,
        status: 'PENDING',
        price: totalPrice,
        packageSize: orderData.packageSize,
        isFragile: orderData.isFragile || false,
        requiresSpecialHandling: orderData.requiresSpecialHandling || false,
        guestInfo: {
          email: 'placeholder@example.com',
          firstName: 'placeholder',
          lastName: 'placeholder',
          phone: 'placeholder'
        },
        isConsumerOrder: true,
        // Add zone information if provided
        ...(zoneId && { deliveryZone: new mongoose.Types.ObjectId(zoneId) }),
        ...(zonePrice && { zonePrice })
      }], { session });

      await session.commitTransaction();
      return this.toOrderResponse(order[0]);

    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  private toOrderResponse(order: IOrderDocument): IOrder {
    const orderObject = order.toObject();
    return {
      ...orderObject,
      _id: orderObject._id.toString(),
      userId: orderObject.userId ? orderObject.userId.toString() : undefined,
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
        storeId: typeof item.storeId === 'object' ? item.storeId.toString() : item.storeId
      }))
    } as IOrder;
  }

  public async findConsumerOrders(consumerId: string): Promise<any[]> {
    return this.model.find({ consumerId });
  }

  public async findConsumerOrderById(orderId: string, consumerId: string): Promise<any | null> {
    return this.model.findOne({ _id: orderId, consumerId });
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
}