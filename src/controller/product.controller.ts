import { Request, Response } from "express";
import logger from "../utils/logger";
import {
  createProduct,
  findAndDeleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import { ObjectId } from "mongoose";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id as ObjectId;
    const body = req.body;

    const product = await createProduct({ ...body, user: userId });
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.message);
  }
}
export async function getProductHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  try {
    const product = await findProduct(req.body);
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.messaeg);
  }
}

export async function updateProductHandler(
  req: Request<UpdateProductInput["params"], {}, UpdateProductInput["body"]>,
  res: Response
) {
  try {
    const product = await findAndUpdateProduct(req.body);
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.messaeg);
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  try {
    const product = await findAndDeleteProduct(req.body);
    return res.send(product);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.messaeg);
  }
}
