import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rating } from "./Rating";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column()
  manufacturer: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column()
  description: string;

  @OneToMany((type) => Rating, (rating) => rating.product)
  ratings: Rating[];
}
