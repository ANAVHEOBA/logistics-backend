import { Payment } from './payment.schema';
import { IPayment } from './payment.model';

export class PaymentCrud {
  async createPayment(paymentData: Partial<IPayment>): Promise<IPayment> {
    return await Payment.create(paymentData);
  }

  async updatePaymentStatus(reference: string, status: string): Promise<IPayment | null> {
    return await Payment.findOneAndUpdate(
      { reference },
      { status },
      { new: true }
    );
  }

  async getPaymentByReference(reference: string): Promise<IPayment | null> {
    return await Payment.findOne({ reference });
  }

  async getPaymentByOrderId(orderId: string): Promise<IPayment | null> {
    return await Payment.findOne({ orderId });
  }
}