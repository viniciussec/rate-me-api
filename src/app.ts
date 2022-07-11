import bodyParser from "body-parser";
import express from "express";
import myDataSource from "./datasource";
import routes from "./routes";
import { BlobServiceClient } from "@azure/storage-blob";

const { v1: uuidv1 } = require("uuid");
require("dotenv").config();

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

app.post("/image", bodyParser.raw({ type: "image/*" }), async (req, res) => {
  //Código do upload da imagem

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING as string
  );

  const containerName = "images";

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = "image" + uuidv1() + ".jpg";

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const data = req.body;
  await blockBlobClient.upload(data, data.length);

  const url = `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/images/${blobName}`;

  //Fim do código do upload da imagem

  res.send({ imageUrl: url });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
