import express from "express";
import { getDBHandler } from "../db/index.js";

const ToDosRequestHandler = express.Router();

ToDosRequestHandler.post("/to-dos", async (req, res) => {
  try {
    const { title, description, isDone: is_done } = req.body;
    const dbHandler = await getDBHandler();

    const newTodo = await dbHandler.run(`
      INSERT INTO todos (title, description, is_done) 
      VALUES (
        "${title}",
        "${description}",
         "${is_done}"
        
      )`);
    await dbHandler.close();

    res.send({ newTodo: { title, description, is_done, ...newTodo } });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Internal Server Error", errorInfo: error.message });
  }
});

ToDosRequestHandler.get("/to-dos", async (req, res) => {
  try {
    const dbHandler = await getDBHandler();

    const todos = await dbHandler.all(`SELECT * FROM todos`);
    await dbHandler.close();

    if (!todos || !todos.length) {
      return res.status(404).send({ error: "No ToDos found" });
    }

    res.send({ todos });
  } catch {
    res.status(500).send({
      error: "Internal Server Error get the todos",
      errorInfo: error.message,
    });
  }
});

ToDosRequestHandler.delete("/to-dos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const dbHandler = await getDBHandler();

    const deletedTodo = await dbHandler.run(
      `DELETE FROM todos WHERE id = ?`,
      todoId
    );
    await dbHandler.close();

    res.send({ todoRemoved: { ...deletedTodo } });
  } catch {
    res.status(500).send({
      error: "Internal Server Error deleted the todos",
      errorInfo: error.message,
    });
  }
});

ToDosRequestHandler.put("/to-dos", async (req, res) => {
  try {
    const todoId = req.params.id;
    const dbHandler = await getDBHandler();

    const updateTodo = await dbHandler.run(
      `DELETE FROM todos WHERE id = ?`,
      todoId
    );
    await dbHandler.close();

    res.send({ todoUpdate: { ...updateTodo } });
  } catch {
    res.status(500).send({
      error: "Internal Server Error update the todos",
      errorInfo: error.message,
    });
  }
});

export { ToDosRequestHandler };
