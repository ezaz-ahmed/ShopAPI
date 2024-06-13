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
import { Types } from "mongoose";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id as Types.ObjectId;
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
    const productId = req.params.productId;

    const products = await findProduct({ _id: productId });

    const product = products[0];

    if (!product) {
      return res.sendStatus(404);
    }
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
    const userId = res.locals.user._id;
    const productId = req.params.productId;
    const update = req.body;

    const products = await findProduct({ _id: productId });

    const product = products[0];

    if (!product) {
      return res.sendStatus(404);
    }

    if (product.user.toString() !== userId) {
      return res.sendStatus(403);
    }

    const updatedProdct = await findAndUpdateProduct(
      { _id: productId },
      update,
      {
        new: true,
      }
    );

    return res.send(updatedProdct);
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
    const userId = res.locals.user._id;
    const productId = req.params.productId;

    const products = await findProduct({ _id: productId });
    const product = products[0];

    if (!product) {
      return res.sendStatus(404);
    }

    if (!product.user.equals(userId)) {
      return res.sendStatus(403);
    }

    await findAndDeleteProduct({ _id: productId });

    res.sendStatus(200);
  } catch (error: any) {
    logger.error(error);
    return res.status(409).send(error.messaeg);
  }
}
