import express from "express";
import { initDB } from "./db/index.js";

const Api = express();

Api.use(express.json({}));
Api.use(express.urlencoded({ extended: false }));

Api.get("/test", (req, res) => {
  res.send({ message: "Hello World!" });
});

Api.listen(3000, () => {
  console.log("Server is running on port 3000");
  initDB().then(() => {
    console.log("DB initialized");
  });
});
