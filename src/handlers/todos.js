import express from "express";
import { getDBHandler } from "../db/index.js";

const ToDosRequestHandler = express.Router();

ToDosRequestHandler.post("/to-dos", async (req, res) => {
  try {
    const { title, description, isDone: is_done } = req.body;
    const dbHandler = await getDBHandler();

    // Insert a new record into the to-dos table
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

// Get all to-dos
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

// Delete a to-do
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

// Update a to-do
ToDosRequestHandler.patch("/to-dos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description, is_done } = req.body;
    const dbHandler = await getDBHandler();
    const todoUpdate = await dbHandler.get(
      `SELECT * FROM todos WHERE id = ?`,
      todoId
    );
    let isDone = is_done ? 1 : 0;

    await dbHandler.run(
      `UPDATE todos SET title = ?, description = ?, is_done = ?
       WHERE id = ?`,
      title || todoUpdate.title,
      description || todoUpdate.description,
      isDone,
      todoId || todoUpdate.id
    );
    await dbHandler.close();

    res.send({ todoToUpdate: { ...todoUpdate, title, description, is_done } });
  } catch {
    res.status(500).send({
      error: "Internal Server Error update the todos",
      errorInfo: error.message,
    });
  }
});

export { ToDosRequestHandler };
