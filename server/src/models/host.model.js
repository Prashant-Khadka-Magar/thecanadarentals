import mongoose, { Schema } from "mongoose";
import { User } from "./user.model.js";

const hostSchema = new Schema(
  {
    contactNumber: {
      type: Number,
      required: true,
    },
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  {
    timestamps: true,
  },
);


export const Host = User.discriminator("Host", hostSchema);
