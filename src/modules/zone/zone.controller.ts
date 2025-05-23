import { Request, Response } from 'express';
import { ZoneCrud } from './zone.crud';

export class ZoneController {
  private zoneCrud: ZoneCrud;

  constructor() {
    this.zoneCrud = new ZoneCrud();
  }

  createZone = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('Creating zone with data:', req.body);
      const zone = await this.zoneCrud.createZone(req.body);
      res.status(201).json({ success: true, data: zone });
    } catch (error) {
      console.error('Zone creation error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to create zone',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
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

  getActiveZones = async (req: Request, res: Response): Promise<void> => {
    try {
      const zones = await this.zoneCrud.getAllZones();
      
      // Format the response to include additional information
      const formattedZones = zones.map(zone => ({
        _id: zone._id,
        name: zone.name,
        deliveryPrice: zone.deliveryPrice,
        description: zone.description || `Delivery to ${zone.name}`
      }));
      
      res.status(200).json({ 
        success: true, 
        data: formattedZones 
      });
    } catch (error) {
      console.error('Get active zones error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Failed to fetch active zones' 
      });
    }
  };
}