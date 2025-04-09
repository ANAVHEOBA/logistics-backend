import { AddressSchema } from './address.schema';
import { IAddress, IAddressDocument, ICreateAddressRequest } from './address.model';
import mongoose from 'mongoose';

export class AddressCrud {
  async createAddress(userId: string, addressData: ICreateAddressRequest): Promise<IAddress> {
    try {
      const address = await AddressSchema.create({
        ...addressData,
        userId
      });
      return this.toAddressResponse(address);
    } catch (error) {
      throw error;
    }
  }

  async findUserAddresses(userId: string): Promise<IAddress[]> {
    try {
      const addresses = await AddressSchema.find({ userId }).sort({ isDefault: -1 }).exec();
      return addresses.map(address => this.toAddressResponse(address));
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string, userId: string): Promise<IAddress | null> {
    try {
      const address = await AddressSchema.findOne({ _id: id, userId }).exec();
      return address ? this.toAddressResponse(address) : null;
    } catch (error) {
      throw error;
    }
  }

  async updateAddress(id: string, userId: string, updateData: Partial<ICreateAddressRequest>): Promise<IAddress | null> {
    try {
      const address = await AddressSchema.findOneAndUpdate(
        { _id: id, userId },
        updateData,
        { new: true }
      ).exec();
      return address ? this.toAddressResponse(address) : null;
    } catch (error) {
      throw error;
    }
  }

  async deleteAddress(id: string, userId: string): Promise<boolean> {
    try {
      const result = await AddressSchema.deleteOne({ _id: id, userId }).exec();
      return result.deletedCount > 0;
    } catch (error) {
      throw error;
    }
  }

  async findByIdWithoutUser(id: string): Promise<IAddress | null> {
    try {
      const address = await AddressSchema.findById(id).exec();
      return address ? this.toAddressResponse(address) : null;
    } catch (error) {
      throw error;
    }
  }

  async findStoreAddress(storeId: string): Promise<IAddress | null> {
    try {
      // First get the store to find its userId
      const store = await mongoose.model('Store').findById(storeId).exec();
      if (!store) {
        return null;
      }

      // Then find the store's address using the userId
      const address = await AddressSchema.findOne({ 
        userId: store.userId,
        label: 'Store Address'
      }).exec();
      
      return address ? this.toAddressResponse(address) : null;
    } catch (error) {
      throw error;
    }
  }

  private toAddressResponse(address: IAddressDocument): IAddress {
    const addressObject = address.toObject();
    return {
      ...addressObject,
      _id: addressObject._id.toString(),
    } as IAddress;
  }
}