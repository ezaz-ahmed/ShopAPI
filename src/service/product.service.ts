import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import ProductModel, { IProduct, ProductInput } from "../models/product.model";

export async function createProduct(input: ProductInput) {
  console.log(
    input.title,
    input.price,
    input.description,
    input.image,
    input.user
  );

  const product = await ProductModel.create(input);
  return product.toJSON();
}

export async function findProduct(query: FilterQuery<IProduct>) {
  return await ProductModel.find(query).lean();
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
