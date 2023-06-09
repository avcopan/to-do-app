import axios from "axios";

export const getTodos = async () => {
  try {
    const res = await axios.get("/todo");
    const todos = res.data.sort((a, b) => a.id - b.id);
    return todos;
  } catch (error) {
    return console.error(error);
  }
};

export const addTodo = async (task) => {
  const newTodo = { task: task };

  try {
    await axios.post("/todo", newTodo);
  } catch (error) {
    return console.error(error);
  }
};

export const editTodosCompleted = async (ids, completed) => {
  const idCsv = ids.join(",");

  try {
    await axios.put(`/todo?ids=${idCsv}&completed=${completed}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const removeTodos = async (ids) => {
  const idCsv = ids.join(",");

  try {
    await axios.delete(`/todo?ids=${idCsv}`);
  } catch (error) {
    throw new Error(error);
  }
};