import { DataSource } from "typeorm";

const myDataSource = new DataSource({
  type: "sqlite",
  database: "rate-me-bd",
  entities: ["src/entities/*.{ts,js}"],
  logging: false,
  synchronize: true,
});

export default myDataSource;
