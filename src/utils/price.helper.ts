import { IOrderDocument, PackageSize } from '../modules/order/order.model';

interface PriceConfig {
  basePrice: number;
  sizeMultiplier: {
    SMALL: number;
    MEDIUM: number;
    LARGE: number;
    EXTRA_LARGE: number;
  };
  additionalFees: {
    fragile: number;
    expressDelivery: number;
    specialHandling: number;
  };
}

const priceConfig: PriceConfig = {
  basePrice: 1000, // Base price in cents (₦10.00)
  sizeMultiplier: {
    SMALL: 1,
    MEDIUM: 2,
    LARGE: 3,
    EXTRA_LARGE: 4
  },
  additionalFees: {
    fragile: 500, // ₦5.00
    expressDelivery: 2000, // ₦20.00
    specialHandling: 1000 // ₦10.00
  }
};

export const calculatePrice = async (order: IOrderDocument): Promise<number> => {
  try {
    if (!order.packageSize) {
      throw new Error('Package size is required for price calculation');
    }

    // Base price calculation
    let price = priceConfig.basePrice * priceConfig.sizeMultiplier[order.packageSize];

    // Add additional fees
    if (order.isFragile) {
      price += priceConfig.additionalFees.fragile;
    }
    
    if (order.isExpressDelivery) {
      price += priceConfig.additionalFees.expressDelivery;
    }
    
    if (order.requiresSpecialHandling) {
      price += priceConfig.additionalFees.specialHandling;
    }

    return price;
  } catch (error) {
    console.error('Price calculation error:', error);
    throw error;
  }
};

export const formatPrice = (priceInCents: number): string => {
  return `₦${(priceInCents / 100).toFixed(2)}`;
}; 