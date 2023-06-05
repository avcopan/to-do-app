const express = require("express");
const todoRouter = express.Router();
const todoQuery = require("../queries/todo.query");

// GET
/**
 * @api {get} /todo - Get the list of todo items
 */
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
/**
 * @api {post} /todo - Add an individual todo item
 */
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
/**
 * @api {delete} /todo/:id - Edit an individual todo item
 * @apiParam {Number} id - The ID of the todo item to be edited
 */
todoRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const editedTodo = req.body;

  todoQuery
    .editTodo(id, editedTodo)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

const parseCsvNumbers = (csvNumbers) => {
  return csvNumbers.split(",").map(Number);
};

/**
 * @api {put} /todo - Batch edit multiple todo items, modifying only the
 * completion status
 * @apiQuery {String} ids - Comma separated list of IDs to be edited
 * @apiQuery {String="true","false"} completed - The value to assign to the compl
 */
todoRouter.put("/", (req, res) => {
  const ids = parseCsvNumbers(req.query.ids);
  const completed = req.query.completed.toLowerCase() === 'true';
  console.log("Editing ids:", ids);
  console.log("completed:", completed);

  todoQuery
    .editTodosCompleted(ids, completed)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

// DELETE
/**
 * @api {delete} /todo/:id - Delete an individual todo item
 * @apiParam {Number} id - The ID of the todo item to be deleted
 */
todoRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  console.log("Received DELETE request for", id);
  todoQuery
    .removeTodo(id)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

/**
 * @api {delete} /todo - Batch remove multiple todo items
 * @apiQuery {String} ids - Comma separated list of IDs to be removed
 */
todoRouter.delete("/", (req, res) => {
  const ids = parseCsvNumbers(req.query.ids);
  console.log("ids:", ids);

  todoQuery
    .removeTodos(ids)
    .then(() => res.sendStatus(204))
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

module.exports = todoRouter;
