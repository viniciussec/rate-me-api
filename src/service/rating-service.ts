import myDataSource from "../datasource";
import { Product } from "../entities/Product";
import { Rating } from "../entities/Rating";

export class RatingService {
  async create(rate: any): Promise<Rating | Error> {
    const { rating, comment, productId } = rate;
    const ratingRepository = myDataSource.getRepository(Rating);
    const productRepository = myDataSource.getRepository(Product);

    const newRating = await ratingRepository.create({
      rating,
      comment,
    });

    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", { newRating });

    const product = await productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      return new Error("Product not found");
    }

    newRating.product = product;

    ratingRepository.save(newRating);

    return newRating;
  }
}
