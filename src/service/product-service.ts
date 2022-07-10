import myDataSource from "../datasource";
import { Product } from "../entities/Product";

export class ProductService {
  async getAll(): Promise<Product[] | Error> {
    const productRepository = myDataSource.getRepository(Product);
    const products = await productRepository.find({ relations: ["ratings"] });
    return products;
  }

  async create(product: any): Promise<Product | Error> {
    const { name, manufacturer, category, description } = product;
    const productRepository = myDataSource.getRepository(Product);

    const newProduct = await productRepository.create({
      name,
      manufacturer,
      category,
      description,
    });
    productRepository.save(newProduct);

    return newProduct;
  }

  async getById(id: number): Promise<Product[] | Error> {
    const productRepository = myDataSource.getRepository(Product);
    const product = await productRepository.find({
      where: { id },
      relations: ["ratings"],
    });
    return product;
  }
}
