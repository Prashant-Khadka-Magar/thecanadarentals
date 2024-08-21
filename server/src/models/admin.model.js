import mongoose from "mongoose";
import { User } from "./user.model.js";

const adminSchema = new mongoose.Schema(
  {
    permissions: {
      type: [String],
      default: ["read", "write", "delete"], // Example permissions
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = User.discriminator("Admin", adminSchema);
