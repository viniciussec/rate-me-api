import { Router } from "express";
import { ProductController } from "./controllers/ProductController";
import { RatingController } from "./controllers/RatingController";

const routes = Router();

routes.get("/products", new ProductController().get);
routes.post("/products", new ProductController().create);
routes.post("/ratings", new RatingController().create);

export default routes;
