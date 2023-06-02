import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    getTodos().then(setTodoList);
  }, []);
  console.log(todoList);

  const getTodos = () => {
    return axios
      .get("/todo")
      .then((res) => res.data)
      .catch((error) => console.error(error));
  };

  const addTodo = (event) => {
    event.preventDefault();
    const newTodo = { task: taskInput };
    setTaskInput("");

    return axios
      .post("/todo", newTodo)
      .then(() => getTodos().then(setTodoList))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>To Do App</h1>
      <h2>To Do List:</h2>
      <div>
        {todoList.map((todo) => {
          return (
            <div key={todo.id}>
              {todo.task} ({todo.completed ? "Done" : "Not done"})
            </div>
          );
        })}
      </div>
      <h2>Add To Do Item:</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          id="taskInput"
          placeholder="Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
