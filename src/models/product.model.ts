import { Document, Schema, model } from "mongoose";
import { customAlphabet } from "nanoid";
import { IUser } from "./user.model";

const nanoid = customAlphabet("abcdefghifjklmnopqrstuvwxyz0123456789", 10);

export interface IProduct extends Document {
  user: IUser["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: String,
      requried: true,
      unique: true,
      default: () => `product_${nanoid}`,
    },
    title: {
      type: String,
      default: true,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SessionModel = model<IProduct>("Session", sessionSchema);

export default SessionModel;
