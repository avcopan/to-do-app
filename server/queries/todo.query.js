const pool = require("../modules/pool");

/** Get the todos currently in the database
 */
const getTodos = async () => {
  const queryString = "SELECT * FROM todos;";

  try {
    const result = await pool.query(queryString);
    return result.rows;
  } catch (error) {
    throw new Error(error);
  }
};

/** Add an individual todo to the database
 *
 * @param {Object} todo - The todo to be added
 */
const addTodo = async (todo) => {
  const queryString = `
    INSERT INTO todos (task)
    VALUES ($1);
  `;
  const queryParams = [todo.task];

  try {
    return await pool.query(queryString, queryParams);
  } catch (error) {
    throw new Error(error);
  }
};

/** Edit an individual todo in the database
 *
 * @param {Number} id - The ID of the todo to be edited
 * @param {Object} todo - The updated todo object
 */
const editTodo = async (id, todo) => {
  const queryString = `
    UPDATE todos
    SET task = $2, completed = $3
    WHERE id = $1;
  `;
  const queryParams = [id, todo.task, todo.completed];

  try {
    return await pool.query(queryString, queryParams);
  } catch (error) {
    throw new Error(error);
  }
};

/** Batch edit the completion status of multiple todos in the database
 *
 * @param {Number[]} ids - An array of IDs for todos to be edited
 * @param {Object} completed - The completion status to assign to these todos
 */
const editTodosCompleted = async (ids, completed) => {
  const queryString = `
    UPDATE todos
    SET completed = $2
    WHERE id = ANY($1::int[]);
  `;
  const queryParams = [ids, completed];
  console.log('queryParams:', queryParams);

  try {
    return await pool.query(queryString, queryParams);
  } catch (error) {
    throw new Error(error);
  }
};

/** Remove an individual todo from the database
 *
 * @param {Number} id - The ID of the todo to be removed
 */
const removeTodo = async (id) => {
  const queryString = `DELETE FROM todos WHERE id=$1;`;
  const queryParams = [id];

  try {
    return await pool.query(queryString, queryParams);
  } catch (error) {
    throw new Error(error);
  }
};

/** Batch remove multiple todos from the database
 *
 * @param {Number[]} ids - An array of IDs for todos to be removed
 */
const removeTodos = async (ids) => {
  // Note: `WHERE id IN $1::int[]` does not work for whatever reason, but the
  // following does:
  const queryString = `DELETE FROM todos WHERE id = ANY($1::int[]);`;
  const queryParams = [ids];
  console.log("queryParams:", queryParams);

  try {
    return await pool.query(queryString, queryParams);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getTodos,
  addTodo,
  editTodo,
  editTodosCompleted,
  removeTodo,
  removeTodos,
};
