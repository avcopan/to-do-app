import axios from "axios";

export const getTodos = async () => {
  try {
    const res = await axios.get("/todo");
    const todos = res.data
      .sort((a, b) => a.id - b.id)
      .sort((a, b) => Number(a.completed) - Number(b.completed));
    return todos;
  } catch (error) {
    return console.error(error);
  }
};

export const addTodo = async (task, refreshState) => {
  const newTodo = { task: task };

  try {
    await axios.post("/todo", newTodo);
    await refreshState();
  } catch (error) {
    return console.error(error);
  }
};

export const editTodoCompleted = async (id, todo, refreshState) => {
  try {
    todo.completed = !todo.completed;
    await axios.put(`/todo/${id}`, todo);
    await refreshState();
  } catch (error) {
    throw new Error(error);
  }
};

export const editTodosCompleted = async (ids, completed, refreshState) => {
  const idCsv = ids.join(",");

  try {
    await axios.put(`/todo?ids=${idCsv}&completed=${completed}`);
    await refreshState();
  } catch (error) {
    throw new Error(error);
  }
};

export const removeTodo = async (id, refreshState) => {
  console.log("REMOVING TODO!");
  console.log("id:", id);
  try {
    await axios.delete(`/todo/${id}`);
    await refreshState();
  } catch (error) {
    throw new Error(error);
  }
};

export const removeTodos = async (ids, refreshState) => {
  const idCsv = ids.join(",");

  try {
    await axios.delete(`/todo?ids=${idCsv}`);
    await refreshState();
  } catch (error) {
    throw new Error(error);
  }
};
