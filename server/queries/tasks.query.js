const pool = require("../modules/pool");

const getTasks = () => {
  const queryString = "SELECT * FROM tasks;";

  return pool
    .query(queryString)
    .then((result) => result.rows)
    .catch((error) => {
      throw new Error(error);
    });
};

const addTask = (task) => {
  const queryString = `
    INSERT INTO tasks (content)
    VALUES ($1);
  `;
  const queryParams = [task.content];

  return pool.query(queryString, queryParams).catch((error) => {
    throw new Error(error);
  });
};

const editTask = (id, task) => {
  const queryString = `
    UPDATE tasks
    SET content = $2, completed = $3
    WHERE id = $1;
  `;
  const queryParams = [id, task.content, task.completed];

  return pool.query(queryString, queryParams).catch((error) => {
    throw new Error(error);
  });
};

const removeTask = (id) => {
  const queryString = `DELETE FROM tasks WHERE id=$1;`;
  const queryParams = [id];

  return pool.query(queryString, queryParams).catch((error) => {
    throw new Error(error);
  });
};

module.exports = { getTasks, addTask, editTask, removeTask };
