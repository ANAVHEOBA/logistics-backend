import { Request, Response } from 'express';
import { ZoneCrud } from './zone.crud';

export class ZoneController {
  private zoneCrud: ZoneCrud;

  constructor() {
    this.zoneCrud = new ZoneCrud();
  }

  createZone = async (req: Request, res: Response): Promise<void> => {
    try {
      const zone = await this.zoneCrud.createZone(req.body);
      res.status(201).json({ success: true, data: zone });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to create zone' });
    }
  };

  getAllZones = async (req: Request, res: Response): Promise<void> => {
    try {
      const zones = await this.zoneCrud.getAllZones();
      res.status(200).json({ success: true, data: zones });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch zones' });
    }
  };

  updateZone = async (req: Request, res: Response): Promise<void> => {
    try {
      const zone = await this.zoneCrud.updateZone(req.params.id, req.body);
      res.status(200).json({ success: true, data: zone });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update zone' });
    }
  };

  deleteZone = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.zoneCrud.deleteZone(req.params.id);
      res.status(200).json({ success: true, message: 'Zone deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete zone' });
    }
  };
}