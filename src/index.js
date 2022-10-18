import express from "express";
import { initDB } from "./db/index.js";
import { ToDosRequestHandler } from "./handlers/todos.js";
import cors from "cors";

const Api = express();

Api.use(cors());
Api.use(express.json({}));
Api.use(express.urlencoded({ extended: false }));
Api.use("/v1", ToDosRequestHandler);

Api.listen(3000, () => {
  console.log("Server is running on port 3000");
  initDB().then(() => {
    console.log("DB initialized");
  });
});
