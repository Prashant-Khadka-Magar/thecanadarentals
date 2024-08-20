import mongoose, { Schema } from "mongoose";

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
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
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
    refreshToken: {
      type: String,
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

export const Seeker = mongoose.model("Seeker", seekerSchema);
