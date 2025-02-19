import { AdminSchema } from './admin.schema';
import { IAdmin, IAdminDocument, IAdminResponse } from './admin.model';
import { Types } from 'mongoose';

export class AdminCrud {
  async findByEmail(email: string): Promise<IAdminDocument | null> {
    try {
      return await AdminSchema.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  async updateLastLogin(adminId: string): Promise<void> {
    try {
      await AdminSchema.findByIdAndUpdate(adminId, {
        lastLoginAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  }

  private toAdminResponse(admin: IAdminDocument): IAdminResponse {
    const adminObj = admin.toObject();
    return {
      _id: adminObj._id.toString(),
      email: adminObj.email,
      name: adminObj.name,
      role: adminObj.role,
      lastLoginAt: adminObj.lastLoginAt
    };
  }

  async createAdmin(adminData: Omit<IAdmin, '_id' | 'createdAt' | 'updatedAt' | 'lastLoginAt'>): Promise<IAdminDocument> {
    try {
      const admin = new AdminSchema(adminData);
      return await admin.save();
    } catch (error) {
      throw error;
    }
  }
} 