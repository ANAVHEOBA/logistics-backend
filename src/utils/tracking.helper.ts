import { randomBytes } from 'crypto';

export const generateTrackingNumber = (): string => {
  // Format: LG-YYYYMMDD-XXXXX
  // LG: Logistics
  // YYYYMMDD: Date
  // XXXXX: Random alphanumeric
  
  const date = new Date();
  const dateStr = date.getFullYear() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0');
    
  const random = randomBytes(3)
    .toString('hex')
    .toUpperCase()
    .slice(0, 5);
    
  return `LG-${dateStr}-${random}`;
}; 