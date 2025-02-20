import { OrderItem } from './orderItem.schema';
import { IOrderItem, OrderItemStatus, RefundStatus } from './orderItem.model';
import mongoose, { FilterQuery } from 'mongoose';

export class OrderItemCrud {
  async createOrderItems(
    items: Array<Partial<IOrderItem>>,
    session?: mongoose.ClientSession
  ): Promise<IOrderItem[]> {
    return await OrderItem.create(items, { session });
  }

  async findByOrderId(orderId: string): Promise<IOrderItem[]> {
    return await OrderItem.find({ orderId })
      .populate('productId')
      .sort({ createdAt: -1 });
  }

  async findByStoreId(
    storeId: string,
    query: {
      page?: number;
      limit?: number;
      status?: OrderItemStatus;
    }
  ) {
    const { page = 1, limit = 10, status } = query;
    const skip = (page - 1) * limit;

    const filter: FilterQuery<IOrderItem> = { storeId };
    if (status) filter.status = status;

    const [items, total] = await Promise.all([
      OrderItem.find(filter)
        .populate('orderId')
        .populate('productId')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      OrderItem.countDocuments(filter)
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async updateStatus(
    itemId: string,
    status: OrderItemStatus,
    session?: mongoose.ClientSession
  ): Promise<IOrderItem | null> {
    return await OrderItem.findByIdAndUpdate(
      itemId,
      { status },
      { new: true, session }
    );
  }

  async initiateRefund(
    itemId: string,
    reason: string
  ): Promise<IOrderItem | null> {
    return await OrderItem.findByIdAndUpdate(
      itemId,
      {
        status: OrderItemStatus.REFUNDED,
        refundStatus: RefundStatus.PENDING,
        refundReason: reason
      },
      { new: true }
    );
  }

  async updateRefundStatus(
    itemId: string,
    status: RefundStatus
  ): Promise<IOrderItem | null> {
    return await OrderItem.findByIdAndUpdate(
      itemId,
      { refundStatus: status },
      { new: true }
    );
  }

  async getStoreOrderItemStats(storeId: string) {
    const stats = await OrderItem.aggregate([
      { $match: { storeId: new mongoose.Types.ObjectId(storeId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$price', '$quantity'] } }
        }
      }
    ]);

    return stats.reduce((acc: any, curr) => {
      acc[curr._id.toLowerCase()] = {
        count: curr.count,
        value: curr.totalValue
      };
      return acc;
    }, {});
  }
} 