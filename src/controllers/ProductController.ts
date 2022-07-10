import { Request, Response } from "express";
import { ProductService } from "../service/product-service";

export class ProductController {
  async get(req: Request, res: Response) {
    const { id } = req.query;
    const productService = new ProductService();

    if (id) {
      const product = await productService.getById(Number(id));
      return res.status(200).json(product);
    }
    const products = await productService.getAll();
    return res.status(200).json(products);
  }

  async create(req: Request, res: Response) {
    const { name, manufacturer, category, description } = req.body;
    const product = await new ProductService().create({
      name,
      manufacturer,
      category,
      description,
    });
    return res.status(201).json(product);
  }
}
