import { Document, Schema, Types, model } from "mongoose";

const importNanoid = async () => {
  const { customAlphabet } = await import("nanoid");
  return customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);
};
const initializeSchema = async () => {
  const nanoid = await importNanoid();

  export interface ProductInput {
    user: Types.ObjectId;
    title: string;
    description: string;
    price: number;
    image: string;
    productId?: string; // added productId
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
      productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
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

  return model<IProduct>("Product", productSchema);
};

const ProductModel = await initializeSchema();

export default ProductModel;
