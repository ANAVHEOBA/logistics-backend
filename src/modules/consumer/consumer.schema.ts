import mongoose, { Schema } from "mongoose";
import { IConsumerDocument } from "./consumer.model";

const consumerSchema = new Schema<IConsumerDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return (this as any).loginMethod !== "google";
      },
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: function () {
        return (this as any).loginMethod !== "google";
      },
    },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    verificationCode: { type: String, default: "" },
    verificationCodeExpiry: { type: Date },
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },

    /* --- social-login fields --- */
    loginMethod: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String, sparse: true, index: true },
    picture: { type: String },

    preferences: {
      favoriteStores: [{ type: Schema.Types.ObjectId, ref: "Store" }],
      preferredCategories: [String],
    },
    lastLoginAt: Date,
    passwordResetToken: String,
    passwordResetExpiry: Date,
  },
  { timestamps: true },
);

export const ConsumerSchema = mongoose.model<IConsumerDocument>(
  "Consumer",
  consumerSchema,
);

