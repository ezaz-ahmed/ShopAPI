import { Document, Schema, Types, model } from "mongoose";

export interface ProductInput {
  user: Types.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface IProduct extends ProductInput, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = model<IProduct>("Product", productSchema);

export default ProductModel;
