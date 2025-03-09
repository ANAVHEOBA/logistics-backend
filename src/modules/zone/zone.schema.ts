import { Schema } from 'mongoose';

const zoneSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  deliveryPrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

export default zoneSchema;