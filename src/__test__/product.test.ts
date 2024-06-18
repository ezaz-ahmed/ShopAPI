import supertest from "supertest";
import createServer from "../utils/server";
import * as ProductService from "../service/product.service";
import mongoose from 'mongoose';

const app = createServer();

const productId = new mongoose.Types.ObjectId().toString();

const productPayload = {
  _id: productId,
  title: "Wireless Noise-Cancelling Headphones",
  image : "https://picsum.photos/id/300/200/300",
  price: 69,
  description: "This product offers an unmatched level of versatility and functionality. It's perfect for both personal and professional use.  Our product is designed to meet the highest standards of quality and excellence. It's the ideal choice for discerning customers.",
};

const productInput = {
  title: "Wireless Noise-Cancelling Headphones",
  image : "https://picsum.photos/id/300/200/300",
  price: 69,
  description: "This product offers an unmatched level of versatility and functionality. It's perfect for both personal and professional use.  Our product is designed to meet the highest standards of quality and excellence. It's the ideal choice for discerning customers.",
};

describe("product", () => {
  // Get Product
  // If product doesn't exist
  // Does user has permission
  // Create Product
  // Update Product
  // Delete Product
});
