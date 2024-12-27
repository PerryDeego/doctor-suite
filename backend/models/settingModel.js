// src/models/settingsModel.js
import mongoose from 'mongoose';

// Define the Settings Schema
const settingsSchema = new mongoose.Schema(
  {
    appTitle: {
      type: String,
      required: true,
      default: "Doctors Suite", // Default value if none is provided
    },
    adminEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    notificationEnabled: {
      type: Boolean,
      default: false, // Default to false if not specified
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set current date when document created
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically create createdAt and updatedAt fields
  }
);

// Create the Settings model
const Setting = mongoose.model('Setting', settingsSchema);

// Export the model to use in controllers
export default Setting;