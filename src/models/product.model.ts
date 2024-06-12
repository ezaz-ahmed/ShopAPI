import { Document, Schema, Types, model } from "mongoose";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("abcdefghifjklmnopqrstuvwxyz0123456789", 10);

export interface IProduct extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: String,
      requried: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    title: {
      type: String,
      requried: true,
    },
    description: {
      type: String,
      requried: true,
    },
    price: {
      type: Number,
      requried: true,
    },
    image: {
      type: String,
      requried: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
