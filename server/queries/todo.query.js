const pool = require("../modules/pool");

const getTodos = () => {
  const queryString = "SELECT * FROM todos;";

  return pool
    .query(queryString)
    .then((result) => result.rows)
    .catch((error) => {
      throw new Error(error);
    });
};

const addTodo = (todo) => {
  const queryString = `
    INSERT INTO todos (task)
    VALUES ($1);
  `;
  const queryParams = [todo.task];

  return pool.query(queryString, queryParams).catch((error) => {
    throw new Error(error);
  });
};

const editTodo = (id, todo) => {
  const queryString = `
    UPDATE todos
    SET task = $2, completed = $3
    WHERE id = $1;
  `;
  const queryParams = [id, todo.task, todo.completed];

  return pool.query(queryString, queryParams).catch((error) => {
    throw new Error(error);
  });
};

const removeTodo = (id) => {
  const queryString = `DELETE FROM todos WHERE id=$1;`;
  const queryParams = [id];

  return pool.query(queryString, queryParams).catch((error) => {
    throw new Error(error);
  });
};

module.exports = { getTodos, addTodo, editTodo, removeTodo };
