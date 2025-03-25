import { Request, Response } from 'express';
import { AddressCrud } from './address.crud';
import { ICreateAddressRequest, IUpdateAddressRequest } from './address.model';

export class AddressController {
  private addressCrud: AddressCrud;

  constructor() {
    this.addressCrud = new AddressCrud();
  }

  createAddress = async (
    req: Request<{}, {}, ICreateAddressRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user!.userId; // From auth middleware
      const address = await this.addressCrud.createAddress(userId, req.body);

      res.status(201).json({
        success: true,
        data: address
      });
    } catch (error) {
      console.error('Create address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create address'
      });
    }
  };

  getUserAddresses = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const userId = req.user!.userId;
      const addresses = await this.addressCrud.findUserAddresses(userId);

      res.status(200).json({
        success: true,
        data: addresses
      });
    } catch (error) {
      console.error('Get addresses error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get addresses'
      });
    }
  };

  getAddressById = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const address = await this.addressCrud.findById(id, userId);
      if (!address) {
        res.status(404).json({
          success: false,
          message: 'Address not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: address
      });
    } catch (error) {
      console.error('Get address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get address'
      });
    }
  };

  updateAddress = async (
    req: Request<{ id: string }, {}, IUpdateAddressRequest>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const address = await this.addressCrud.updateAddress(id, userId, req.body);
      if (!address) {
        res.status(404).json({
          success: false,
          message: 'Address not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: address
      });
    } catch (error) {
      console.error('Update address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update address'
      });
    }
  };

  deleteAddress = async (
    req: Request<{ id: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = req.user!.userId;
      
      const deleted = await this.addressCrud.deleteAddress(id, userId);
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Address not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Address deleted successfully'
      });
    } catch (error) {
      console.error('Delete address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete address'
      });
    }
  };

  getStoreAddress = async (
    req: Request<{ storeId: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { storeId } = req.params;
      
      const address = await this.addressCrud.findStoreAddress(storeId);
      if (!address) {
        res.status(404).json({
          success: false,
          message: 'Store address not found'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: address
      });
    } catch (error) {
      console.error('Get store address error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get store address'
      });
    }
  };
}