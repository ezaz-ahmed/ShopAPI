import { object, string, number, TypeOf } from "zod";

export const productPayload = object({
  title: string({
    required_error: "Title is required",
  }),
  description: string({
    required_error: "Description is required",
  }).min(120, "Description should be at least 120 characters long"),
  price: number({
    required_error: "Price is required",
  }),
  image: string({
    required_error: "Product Image is required",
  }),
});

const productParams = object({
  productId: string({
    required_error: "Product id is required",
  }),
});

export const createProductSchema = object({
  body: productPayload,
});

export const updateProductSchema = object({
  body: productPayload,
  params: productParams,
});

export const deleteProductSchema = object({
  params: productParams,
});

export const getProductSchema = object({
  params: productParams,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
export type GetProductInput = TypeOf<typeof getProductSchema>;
