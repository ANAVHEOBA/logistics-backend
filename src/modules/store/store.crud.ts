import { Store, IStore, StoreStatus, StoreCategory } from './store.model';
import mongoose from 'mongoose';
import { OrderSchema } from '../order/order.schema';
import { ProductSchema } from '../product/product.schema';
import { 
  PaginationOptions, 
  PaginatedResponse, 
  StoreOrder,
  StoreCustomer,
  RevenueOptions,
  StoreListResponse,
  RevenueStats,
  RevenueBreakdown
} from './store.types';
import { OrderStatus } from '../order/order.model';

interface ListStoresParams {
  filter?: Record<string, any>;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  city?: string;
  state?: string;
  country?: string;
  minRating?: number;
}

export class StoreCrud {
  async createStore(storeData: Partial<IStore>): Promise<IStore> {
    const store = new Store(storeData);
    return await store.save();
  }

  async findByUserId(userId: string): Promise<IStore | null> {
    console.log('Finding store for userId:', userId);
    try {
      const objectId = new mongoose.Types.ObjectId(userId);
      console.log('Query:', { userId: objectId });
      const store = await Store.findOne({ userId: objectId });
      console.log('Store found:', store);
      return store;
    } catch (error) {
      console.error('Error finding store:', error);
      throw error;
    }
  }

  async findByStoreName(storeName: string): Promise<IStore | null> {
    return await Store.findOne({ storeName });
  }

  async updateStore(storeId: string, updateData: Partial<IStore>): Promise<IStore | null> {
    return await Store.findByIdAndUpdate(
      storeId,
      { $set: updateData },
      { new: true }
    );
  }

  async getStoreMetrics(storeId: string) {
    return await Store.findById(storeId).select('metrics');
  }

  async updateMetrics(storeId: string, metrics: Partial<IStore['metrics']>) {
    return await Store.findByIdAndUpdate(
      storeId,
      { $set: { metrics } },
      { new: true }
    );
  }

  async findBySlug(slug: string): Promise<IStore | null> {
    return await Store.findOne({ 
      slug,
      status: { $in: [StoreStatus.ACTIVE, StoreStatus.PENDING] }
    });
  }

  async getPublicStoreData(slug: string): Promise<IStore | null> {
    return await Store.findOne(
      { 
        slug,
        status: { $in: [StoreStatus.ACTIVE, StoreStatus.PENDING] }
      },
      {
        userId: 0,
        businessInfo: 0,
        metrics: 0,
        settings: 0
      }
    );
  }

  async deleteStore(userId: string): Promise<boolean> {
    const result = await Store.deleteOne({ userId });
    return result.deletedCount > 0;
  }

  async activateStore(storeId: string): Promise<IStore | null> {
    return await Store.findByIdAndUpdate(
      storeId,
      { 
        $set: { 
          status: StoreStatus.ACTIVE 
        } 
      },
      { new: true }
    );
  }

  async listStores({
    filter = {},
    page = 1,
    limit = 10,
    sortBy = 'displayOrder',
    sortOrder = 'asc',
    city,
    state,
    country,
    minRating
  }: ListStoresParams): Promise<StoreListResponse> {
    const skip = (page - 1) * limit;

    // Combine with existing filter
    const finalFilter: Record<string, any> = {
      ...filter,
      status: StoreStatus.ACTIVE
    };

    // Add location filters if provided
    if (city) {
      finalFilter['address.city'] = { $regex: city, $options: 'i' };
    }
    if (state) {
      finalFilter['address.state'] = { $regex: state, $options: 'i' };
    }
    if (country) {
      finalFilter['address.country'] = { $regex: country, $options: 'i' };
    }

    // Add rating filter if provided
    if (minRating) {
      finalFilter['metrics.averageRating'] = { $gte: Number(minRating) };
    }

    // Get all stores that match the filter
    const stores = await Store.find(finalFilter)
      .sort({
        isFeatured: -1, // Featured stores first
        displayOrder: 1, // Then by display order
        createdAt: -1 // Then by creation date
      })
      .collation({ locale: "en_US", numericOrdering: true }) // Enable numeric ordering
      .skip(skip)
      .limit(limit);

    const total = await Store.countDocuments(finalFilter);

    return {
      stores,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    };
  }

  async findById(storeId: string): Promise<IStore | null> {
    try {
      return await Store.findById(storeId);
    } catch (error) {
      console.error('Error finding store by ID:', error);
      throw error;
    }
  }

  // Add a new method for admin store listing
  async listAdminStores({
    filter = {},
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    search,
    category,
    status,
    minRevenue,
    maxRevenue
  }: {
    filter?: Record<string, any>;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    category?: StoreCategory;
    status?: StoreStatus;
    minRevenue?: number;
    maxRevenue?: number;
  }) {
    const skip = (page - 1) * limit;

    // Combine with existing filter
    const finalFilter: Record<string, any> = { ...filter };

    // Add search filter
    if (search) {
      finalFilter.$or = [
        { storeName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Add category filter
    if (category) {
      finalFilter.category = category;
    }

    // Add status filter
    if (status) {
      finalFilter.status = status;
    }

    // Add revenue filters
    if (minRevenue !== undefined) {
      finalFilter['metrics.totalRevenue'] = { $gte: minRevenue };
    }
    if (maxRevenue !== undefined) {
      finalFilter['metrics.totalRevenue'] = {
        ...(finalFilter['metrics.totalRevenue'] || {}),
        $lte: maxRevenue
      };
    }

    const stores = await Store
      .find(finalFilter)
      .sort({
        isFeatured: -1, // Featured stores first
        displayOrder: 1, // Then by display order
        createdAt: -1 // Then by creation date
      })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'email firstName lastName');

    const total = await Store.countDocuments(finalFilter);

    return {
      stores,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total
      }
    };
  }

  async getStoreOrders(
    storeId: string,
    options: PaginationOptions
  ): Promise<PaginatedResponse<StoreOrder>> {
    const { page = 1, limit = 10, status } = options;
    const skip = (page - 1) * limit;

    const query: any = {
      'items.storeId': new mongoose.Types.ObjectId(storeId)
    };

    if (status) {
      query.status = status;
    }

    const [orders, total] = await Promise.all([
      OrderSchema.aggregate([
        { $match: query },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
        { $unwind: '$items' },
        { $match: { 'items.storeId': new mongoose.Types.ObjectId(storeId) } },
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
            _id: '$_id',
            orderId: { $first: '$_id' },
            trackingNumber: { $first: '$trackingNumber' },
            status: { $first: '$status' },
            paymentStatus: { $first: '$paymentStatus' },
            paymentMethod: { $first: '$paymentMethod' },
            createdAt: { $first: '$createdAt' },
            items: { $push: '$items' },
            pickupAddress: { $first: '$pickupAddress' },
            deliveryAddress: { $first: '$deliveryAddress' },
            specialInstructions: { $first: '$specialInstructions' },
            storeName: { $first: { $arrayElemAt: ['$storeDetails.storeName', 0] } }
          }
        }
      ]),
      OrderSchema.countDocuments(query)
    ]);

    return {
      data: orders,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getStoreOrderDetails(storeId: string, orderId: string) {
    const order = await OrderSchema.aggregate([
      { 
        $match: { 
          _id: new mongoose.Types.ObjectId(orderId),
          'items.storeId': new mongoose.Types.ObjectId(storeId)
        } 
      },
      { $unwind: '$items' },
      { $match: { 'items.storeId': new mongoose.Types.ObjectId(storeId) } },
      {
        $lookup: {
          from: 'products',
          localField: 'items.productId',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      {
        $group: {
          _id: '$_id',
          orderId: { $first: '$_id' },
          trackingNumber: { $first: '$trackingNumber' },
          status: { $first: '$status' },
          paymentStatus: { $first: '$paymentStatus' },
          createdAt: { $first: '$createdAt' },
          items: {
            $push: {
              $mergeObjects: [
                '$items',
                {
                  productName: { $arrayElemAt: ['$productDetails.name', 0] },
                  productImage: { $arrayElemAt: ['$productDetails.images', 0] }
                }
              ]
            }
          },
          pickupAddress: { $first: '$pickupAddress' },
          deliveryAddress: { $first: '$deliveryAddress' },
          specialInstructions: { $first: '$specialInstructions' },
          isFragile: { $first: '$isFragile' },
          packageSize: { $first: '$packageSize' }
        }
      }
    ]);

    return order[0] || null;
  }

  async updateOrderReadyStatus(
    storeId: string, 
    orderId: string, 
    isReady: boolean
  ): Promise<any> {
    return await OrderSchema.findOneAndUpdate(
      { 
        _id: new mongoose.Types.ObjectId(orderId),
        'items.storeId': new mongoose.Types.ObjectId(storeId)
      },
      { 
        $set: { 
          'storeReadyStatus': isReady,
          'storeReadyAt': isReady ? new Date() : null,
          'status': isReady ? 'READY_FOR_PICKUP' : 'PENDING'
        } 
      },
      { new: true }
    );
  }

  async getStoreRevenue(storeId: string, options?: RevenueOptions): Promise<RevenueStats> {
    try {
      const matchStage: any = {
        'items.storeId': new mongoose.Types.ObjectId(storeId),
        status: 'DELIVERED'  // Only include DELIVERED orders
      };

      // Add date filters if provided
      if (options?.startDate || options?.endDate) {
        matchStage.createdAt = {};
        if (options.startDate) {
          matchStage.createdAt.$gte = options.startDate;
        }
        if (options.endDate) {
          matchStage.createdAt.$lte = options.endDate;
        }
      }

      // Get current date and calculate previous periods
      const now = new Date();
      const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const currentWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      const previousWeek = new Date(now.setDate(now.getDate() - 7));
      const currentDay = new Date(now.setHours(0, 0, 0, 0));
      const previousDay = new Date(now.setDate(now.getDate() - 1));

      const result = await OrderSchema.aggregate([
        { $match: matchStage },
        { $unwind: '$items' },
        {
          $match: {
            'items.storeId': new mongoose.Types.ObjectId(storeId)
          }
        },
        {
          $facet: {
            // Total revenue
            total: [
        {
          $group: {
                  _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Current month revenue
            currentMonth: [
              {
                $match: {
                  createdAt: { $gte: currentMonth }
                }
              },
              {
                $group: {
                  _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Previous month revenue
            previousMonth: [
              {
                $match: {
                  createdAt: { 
                    $gte: previousMonth,
                    $lt: currentMonth
            }
          }
        },
        {
          $group: {
            _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Current week revenue
            currentWeek: [
              {
                $match: {
                  createdAt: { $gte: currentWeek }
                }
              },
              {
                $group: {
                  _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Previous week revenue
            previousWeek: [
              {
                $match: {
                  createdAt: { 
                    $gte: previousWeek,
                    $lt: currentWeek
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Current day revenue
            currentDay: [
              {
                $match: {
                  createdAt: { $gte: currentDay }
                }
              },
              {
                $group: {
                  _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Previous day revenue
            previousDay: [
              {
                $match: {
                  createdAt: { 
                    $gte: previousDay,
                    $lt: currentDay
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              }
            ],
            // Monthly breakdown
            monthlyBreakdown: [
              {
                $group: {
                  _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' }
                  },
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              },
              {
                $sort: { '_id.year': 1, '_id.month': 1 }
              }
            ],
            // Weekly breakdown
            weeklyBreakdown: [
              {
                $group: {
                  _id: {
                    year: { $year: '$createdAt' },
                    week: { $week: '$createdAt' }
                  },
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              },
              {
                $sort: { '_id.year': 1, '_id.week': 1 }
              }
            ],
            // Daily breakdown
            dailyBreakdown: [
              {
                $group: {
                  _id: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                  },
                  amount: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
                  orders: { $sum: 1 }
                }
              },
              {
                $sort: { '_id.date': 1 }
              }
            ]
          }
        }
      ]);

      const stats = result[0];

      return {
        total: stats.total[0] || { amount: 0, orders: 0 },
        monthly: {
          current: stats.currentMonth[0] || { amount: 0, orders: 0 },
          previous: stats.previousMonth[0] || { amount: 0, orders: 0 }
        },
        weekly: {
          current: stats.currentWeek[0] || { amount: 0, orders: 0 },
          previous: stats.previousWeek[0] || { amount: 0, orders: 0 }
        },
        daily: {
          current: stats.currentDay[0] || { amount: 0, orders: 0 },
          previous: stats.previousDay[0] || { amount: 0, orders: 0 }
        },
        breakdown: {
          monthly: stats.monthlyBreakdown.map((item: { _id: { year: number; month: number }; amount: number; orders: number }) => ({
            month: `${item._id.year}-${item._id.month}`,
            amount: item.amount,
            orders: item.orders
          })),
          weekly: stats.weeklyBreakdown.map((item: { _id: { year: number; week: number }; amount: number; orders: number }) => ({
            week: `${item._id.year}-W${item._id.week}`,
            amount: item.amount,
            orders: item.orders
          })),
          daily: stats.dailyBreakdown.map((item: { _id: { date: string }; amount: number; orders: number }) => ({
            date: item._id.date,
            amount: item.amount,
            orders: item.orders
          }))
        }
      };
    } catch (error) {
      console.error('Get store revenue error:', error);
      throw error;
    }
  }

  // Add a new method for detailed revenue analysis
  async getDetailedRevenue(
    storeId: string,
    startDate: Date,
    endDate: Date
  ) {
    return await OrderSchema.aggregate([
      {
        $match: {
          'items.storeId': new mongoose.Types.ObjectId(storeId),
          status: { $in: ['DELIVERED', 'CONFIRMED'] },
          paymentStatus: 'VERIFIED',
          createdAt: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      { $unwind: '$items' },
      {
        $match: {
          'items.storeId': new mongoose.Types.ObjectId(storeId)
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' }
          },
          revenue: {
            $sum: { $multiply: ['$items.price', '$items.quantity'] }
          },
          orderCount: { $sum: 1 },
          itemCount: { $sum: '$items.quantity' }
        }
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
          '_id.day': 1
        }
      }
    ]);
  }

  async getProductPerformance(storeId: string) {
    try {
      const result = await OrderSchema.aggregate([
        {
          $match: {
            'items.storeId': new mongoose.Types.ObjectId(storeId),
            status: { 
              $in: [
                'CONFIRMED',
                'READY_FOR_PICKUP',
                'PICKED_UP',
                'IN_TRANSIT',
                'DELIVERED'
              ]
            }
          }
        },
        { $unwind: '$items' },
        {
          $match: {
            'items.storeId': new mongoose.Types.ObjectId(storeId)
          }
        },
        {
          $lookup: {
            from: 'products',
            let: { productId: '$items.productId' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$productId']
                  }
                }
              },
              {
                $project: {
                  name: 1,
                  _id: 1,
                  status: 1
                }
              }
            ],
            as: 'productDetails'
          }
        },
        {
          $addFields: {
            product: { $arrayElemAt: ['$productDetails', 0] }
          }
        },
        {
          $group: {
            _id: '$items.productId',
            name: { 
              $first: {
                $cond: [
                  { $ifNull: ['$product.name', false] },
                  '$product.name',
                  { $concat: ['[Deleted] Product ID: ', { $toString: '$items.productId' }] }
                ]
              }
            },
            status: {
              $first: {
                $ifNull: ['$product.status', 'DELETED']
              }
            },
            totalOrders: { $sum: 1 },
            totalQuantity: { $sum: '$items.quantity' },
            totalRevenue: {
              $sum: { $multiply: ['$items.price', '$items.quantity'] }
            }
          }
        },
        {
          $project: {
            _id: 0,
            productId: '$_id',
            name: 1,
            status: 1,
            totalOrders: 1,
            totalQuantity: 1,
            totalRevenue: 1
          }
        },
        {
          $sort: { totalRevenue: -1 }
        }
      ]);

      // Additional check to ensure no null names and format deleted products
      const cleanedResult = result.map(product => ({
        ...product,
        name: product.name || `[Deleted] Product ID: ${product.productId}`,
        status: product.status || 'DELETED'
      }));

      return cleanedResult;
    } catch (error) {
      console.error('Get product performance error:', error);
      throw error;
    }
  }

  // Add a new method to validate order status transitions
  async validateOrderStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus): Promise<boolean> {
    const statusFlow: Record<OrderStatus, OrderStatus[]> = {
      'PENDING': ['CONFIRMED'],
      'CONFIRMED': ['READY_FOR_PICKUP', 'CANCELLED'],
      'READY_FOR_PICKUP': ['PICKED_UP', 'CANCELLED'],
      'PICKED_UP': ['IN_TRANSIT', 'CANCELLED'],
      'IN_TRANSIT': ['DELIVERED', 'FAILED_DELIVERY'],
      'DELIVERED': [], // Terminal state
      'CANCELLED': [], // Terminal state
      'FAILED_DELIVERY': ['PENDING'] // Can retry delivery
    };

    const allowedTransitions = statusFlow[currentStatus] || [];
    return allowedTransitions.includes(newStatus);
  }

  // Add method to update order status
  async updateOrderStatus(orderId: string, storeId: string, newStatus: OrderStatus): Promise<any> {
    const order = await OrderSchema.findOne({
      _id: new mongoose.Types.ObjectId(orderId),
      'items.storeId': new mongoose.Types.ObjectId(storeId)
    });

    if (!order) {
      throw new Error('Order not found');
    }

    const isValidTransition = await this.validateOrderStatusTransition(order.status, newStatus);
    if (!isValidTransition) {
      throw new Error(`Invalid status transition from ${order.status} to ${newStatus}`);
    }

    return await OrderSchema.findOneAndUpdate(
      { 
        _id: new mongoose.Types.ObjectId(orderId),
        'items.storeId': new mongoose.Types.ObjectId(storeId)
      },
      { 
        $set: { 
          status: newStatus,
          updatedAt: new Date()
        } 
      },
      { new: true }
    );
  }

  async getStoreCustomers(
    storeId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ customers: StoreCustomer[]; total: number }> {
    const skip = (page - 1) * limit;

    // Aggregate to get customer data from orders
    const aggregation = await OrderSchema.aggregate([
      // Match orders for this store
      { $match: { 'items.storeId': new mongoose.Types.ObjectId(storeId) } },
      
      // Group by consumer
      { 
        $group: {
          _id: '$userId',
          totalOrders: { $sum: 1 },
          totalSpent: { 
            $sum: {
              $reduce: {
                input: '$items',
                initialValue: 0,
                in: {
                  $add: [
                    '$$value',
                    { $multiply: ['$$this.price', '$$this.quantity'] }
                  ]
                }
              }
            }
          },
          lastOrderDate: { $max: '$createdAt' }
        }
      },
      
      // Lookup consumer details
      {
        $lookup: {
          from: 'consumers',
          localField: '_id',
          foreignField: '_id',
          as: 'consumer'
        }
      },

      // Project required fields
      {
        $project: {
          _id: 0,
          consumerId: '$_id',
          name: { $concat: [
            { $arrayElemAt: ['$consumer.firstName', 0] },
            ' ',
            { $arrayElemAt: ['$consumer.lastName', 0] }
          ]},
          email: { $arrayElemAt: ['$consumer.email', 0] },
          totalOrders: 1,
          totalSpent: 1,
          lastOrderDate: 1
        }
      },

      // Sort by most recent order
      { $sort: { lastOrderDate: -1 } },
      
      // Skip and limit for pagination
      { $skip: skip },
      { $limit: limit }
    ]);

    // Get total count for pagination
    const totalCount = await OrderSchema.aggregate([
      { $match: { 'items.storeId': new mongoose.Types.ObjectId(storeId) } },
      { $group: { _id: '$userId' } },
      { $count: 'total' }
    ]);

    return {
      customers: aggregation,
      total: totalCount[0]?.total || 0
    };
  }

  async getAdminStoreMetrics(storeId: string) {
    try {
      const [store, revenue, orders] = await Promise.all([
        Store.findById(storeId).select('metrics'),
        this.getStoreRevenue(storeId),
        OrderSchema.aggregate([
          {
            $match: {
              'items.storeId': new mongoose.Types.ObjectId(storeId),
              status: { 
                $in: [
                  'CONFIRMED',
                  'READY_FOR_PICKUP',
                  'PICKED_UP',
                  'IN_TRANSIT',
                  'DELIVERED'
                ]
              }
            }
          },
          { $unwind: '$items' },
          {
            $match: {
              'items.storeId': new mongoose.Types.ObjectId(storeId)
            }
          },
          {
            $group: {
              _id: null,
              totalOrders: { $sum: 1 },
              totalRevenue: {
                $sum: { $multiply: ['$items.price', '$items.quantity'] }
              }
            }
          }
        ])
      ]);

      const orderStats = orders[0] || { totalOrders: 0, totalRevenue: 0 };

      // Update store metrics with the latest values
      const updatedStore = await Store.findByIdAndUpdate(storeId, {
        $set: {
          'metrics.totalOrders': orderStats.totalOrders,
          'metrics.totalRevenue': revenue.total.amount || 0
        }
      }, { new: true });

      return {
        metrics: {
          totalOrders: orderStats.totalOrders,
          totalProducts: store?.metrics?.totalProducts || 0,
          totalRevenue: revenue.total.amount || 0
        },
        _id: storeId,
        storeUrl: updatedStore?.getStoreUrl()
      };
    } catch (error) {
      console.error('Get admin store metrics error:', error);
      throw error;
    }
  }

  // Add method to get comprehensive store data
  async getStoreFullData(storeId: string) {
    try {
      const store = await Store.findById(storeId)
        .populate('userId', 'email firstName lastName');

      if (!store) return null;

      const [metrics, revenue, performance] = await Promise.all([
        this.getAdminStoreMetrics(storeId),
        this.getStoreRevenue(storeId),
        this.getProductPerformance(storeId)
      ]);

      return {
        store,
        metrics,
        revenue,
        performance
      };
    } catch (error) {
      console.error('Get store full data error:', error);
      throw error;
    }
  }

  // Add new method for bulk update
  async bulkUpdateStoreOrder(updates: Array<{ storeId: string; displayOrder: number }>): Promise<void> {
    const bulkOps = updates.map(update => ({
      updateOne: {
        filter: { _id: new mongoose.Types.ObjectId(update.storeId) },
        update: { $set: { displayOrder: update.displayOrder } }
      }
    }));

    await Store.bulkWrite(bulkOps);
  }

  // Add new method for updating store order
  async updateStoreOrder(storeId: string, orderData: {
    displayOrder?: number;
    isFeatured?: boolean;
    featuredUntil?: Date;
    adminNotes?: string;
  }): Promise<IStore | null> {
    return await Store.findByIdAndUpdate(
      storeId,
      { $set: orderData },
      { new: true }
    );
  }
} 