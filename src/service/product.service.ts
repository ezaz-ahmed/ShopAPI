import { FilterQuery, UpdateQuery, QueryOptions, FlattenMaps } from "mongoose";
import ProductModel, { IProduct } from "../models/product.model";

export async function createProduct(
  input: Omit<IProduct, "createdAt" | "updatedAt">
) {
  const product = await ProductModel.create(input);
  return product.toJSON();
}

export async function findProduct(query: FilterQuery<IProduct>) {
  return ProductModel.find(query).lean();
}

export async function findAndUpdateProduct(
  query: FilterQuery<IProduct>,
  update: UpdateQuery<IProduct>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}

export async function findAndDeleteProduct(query: FilterQuery<IProduct>) {
  return ProductModel.findOneAndDelete(query);
}
