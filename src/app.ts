import express from "express";
import myDataSource from "./datasource";
import routes from "./routes";

const cors = require("cors");

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(express.json());

app.use(cors());

app.use(routes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
