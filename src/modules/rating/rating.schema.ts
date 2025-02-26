import mongoose, { Schema } from 'mongoose';
import { IRatingDocument } from './rating.model';

const ratingSchema = new Schema({
  storeId: {
    type: Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  consumerId: {
    type: Schema.Types.ObjectId,
    ref: 'Consumer',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Ensure a consumer can only rate a store once
ratingSchema.index({ storeId: 1, consumerId: 1 }, { unique: true });

export const Rating = mongoose.model<IRatingDocument>('Rating', ratingSchema); 