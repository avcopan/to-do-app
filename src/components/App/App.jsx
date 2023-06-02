import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [checkedTodos, setCheckedTodos] = useState(new Set());
  const [taskInput, setTaskInput] = useState("");

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);
  console.log(todos);

  const getTodos = async () => {
    try {
      const res = await axios.get("/todo");
      return res.data;
    } catch (error) {
      return console.error(error);
    }
  };

  const addTodo = async (event) => {
    event.preventDefault();
    const newTodo = { task: taskInput };
    setTaskInput("");

    try {
      await axios.post("/todo", newTodo);
      await getTodos().then(setTodos);
    } catch (error) {
      return console.error(error);
    }
  };

  const updateTaskInput = (event) => {
    setTaskInput(event.target.value);
  };

  const updateChecked = (event, todo) => {
    if (event.target.checked) {
      checkedTodos.add(todo);
      setCheckedTodos(checkedTodos);
      console.log("Adding item to checked!");
      console.log(checkedTodos);
    } else {
      checkedTodos.delete(todo);
      setCheckedTodos(checkedTodos);
      console.log("Removing item from checked!");
      console.log(checkedTodos);
    }
  };

  const markCheckedComplete = () => {
    console.log("Marking checked!");
  };

  const deleteChecked = async () => {
    const sendDeleteRequestss = async () => {
      try {
        for await (const todo of checkedTodos) {
          axios
            .delete(`/todo/${todo.id}`)
            .catch((error) => console.error(error));
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    try {
      return sendDeleteRequestss()
        .then(getTodos)
        .then(setTodos);
    } catch (error) {
      return console.error(error);
    }
  };

  return (
    <div>
      <h1>To Do App</h1>
      <h2>To Do List:</h2>
      <div>
        {todos.map((todo) => {
          return (
            <div key={"parent" + todo.id}>
              <input
                type="checkbox"
                key={todo.id}
                onClick={(e) => updateChecked(e, todo)}
              />
              <span className={todo.completed ? "completedTask" : "task"}>
                {todo.task}
              </span>
            </div>
          );
        })}
      </div>
      <button onClick={markCheckedComplete}>Mark Complete</button>
      <button onClick={deleteChecked}>Delete</button>
      <h2>Add To Do Item:</h2>
      <form onSubmit={addTodo}>
        <input
          type="text"
          id="taskInput"
          placeholder="Task"
          value={taskInput}
          onChange={updateTaskInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
