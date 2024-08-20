import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema(
  {
    province: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
  },
  {
    _id: false,
  },
);

const otherRoomiesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
});

const roomSchema = new Schema(
  {
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    location: {
      type: locationSchema,
      required: true,
    },
    availableFrom: {
      type: Date,
      required: true,
      index: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    billsIncluded: {
      type: Boolean,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "Basement", "House"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [50, "Description must be atleast 50 characters long"],
    },
    hasRoommate: {
      type: Boolean,
      required: true,
      default: false,
    },
    otherRoomies: {
      type: [otherRoomiesSchema],
      default: [],
    },
    video: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Room = mongoose.model("Room", roomSchema);
