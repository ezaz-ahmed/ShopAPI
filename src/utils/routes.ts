import { Express, Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import { validateResource } from "../middleware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controler";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from "../middleware/requireUser";
import { createProductSchema } from "../schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "../controller/product.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.get("/api/products/:productId", getProductHandler);
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(createProductSchema)],
    updateProductHandler
  );
  app.delete("/api/products/:productId", requireUser, deleteProductHandler);
}

export default routes;
