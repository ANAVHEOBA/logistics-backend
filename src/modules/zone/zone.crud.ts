import Zone, { IZone } from './zone.model';

export class ZoneCrud {
  async createZone(zoneData: IZone): Promise<IZone> {
    try {
      // Check if zone with same name already exists
      const existingZone = await Zone.findOne({ name: zoneData.name });
      if (existingZone) {
        throw new Error(`Zone with name '${zoneData.name}' already exists`);
      }

      // Validate delivery price
      if (zoneData.deliveryPrice <= 0) {
        throw new Error('Delivery price must be greater than 0');
      }

      return await Zone.create(zoneData);
    } catch (error) {
      console.error('Error in createZone:', error);
      throw error;
    }
  }

  async getZoneByName(name: string): Promise<IZone | null> {
    return await Zone.findOne({ name, isActive: true });
  }

  async getAllZones(): Promise<IZone[]> {
    return await Zone.find({ isActive: true });
  }

  async updateZone(id: string, data: Partial<IZone>): Promise<IZone | null> {
    return await Zone.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteZone(id: string): Promise<boolean> {
    const result = await Zone.findByIdAndUpdate(id, { isActive: false });
    return !!result;
  }

  async getZoneById(id: string): Promise<IZone | null> {
    return await Zone.findOne({ _id: id, isActive: true });
  }
}