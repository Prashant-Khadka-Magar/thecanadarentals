import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

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

const seekerSchema = new Schema(
  {
    contactNumber: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    movingIn: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    seekerType: {
      type: String,
      enum: ["Single", "Couple", "Group"],
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },

    hasRoomies: {
      type: Boolean,
      required: true,
      default: false,
    },
    otherRoomies: {
      type: [otherRoomiesSchema],
      default: [],
    },
    description: {
      type: String,
      required: true,
      minlength: [50, "Description must be atleast 50 characters long"],
    },
  },
  {
    timestamps: true,
  },
);


export const Seeker =User.discriminator("Seeker", seekerSchema);
