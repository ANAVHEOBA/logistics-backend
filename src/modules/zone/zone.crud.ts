import Zone, { IZone } from './zone.model';

export class ZoneCrud {
  async createZone(zoneData: IZone): Promise<IZone> {
    return await Zone.create(zoneData);
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
}