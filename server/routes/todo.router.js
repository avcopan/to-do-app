const express = require("express");
const todoRouter = express.Router();
const todoQuery = require("../queries/todo.query");

// GET
todoRouter.get("/", (_, res) => {
  todoQuery
    .getTodos()
    .then((todos) => res.status(200).send(todos))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// POST
todoRouter.post("/", (req, res) => {
  const newTodo = req.body;

  todoQuery
    .addTodo(newTodo)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// PUT
todoRouter.put("/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  const editedTodo = req.body;

  todoQuery
    .editTodo(todoId, editedTodo)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// DELETE
todoRouter.delete("/:todoId", (req, res) => {
  const todoId = req.params.todoId;

  console.log("Received DELETE request for", todoId);
  todoQuery
    .removeTodo(todoId)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = todoRouter;
