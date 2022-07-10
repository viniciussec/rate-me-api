import { Request, Response } from "express";
import { ProductService } from "../service/product-service";
import { RatingService } from "../service/rating-service";

export class RatingController {
  async create(req: Request, res: Response) {
    const { rating, comment, productId } = req.body;
    const rate = await new RatingService().create({
      rating,
      comment,
      productId,
    });
    return res.status(201).json(rate);
  }
}
