import { useState, useEffect } from "react";
import "./App.css";
import {
  getTodos,
  addTodo,
  editTodosCompleted,
  removeTodos,
} from "../utils/axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  let [checkedIds, setCheckedIds] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const updateChecked = (event, id) => {
    if (event.target.checked) {
      checkedIds.push(id);
    } else {
      checkedIds = checkedIds.filter((i) => i !== id);
    }
    console.log("Updating checkedIds:", checkedIds);
    setCheckedIds(checkedIds);
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
                onClick={(event) => updateChecked(event, todo.id)}
              />
              <span className={todo.completed ? "completedTask" : "task"}>
                {todo.task}
              </span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => {
          editTodosCompleted(checkedIds, true).then(getTodos).then(setTodos);
        }}
      >
        Complete
      </button>
      <button
        onClick={() => {
          editTodosCompleted(checkedIds, false).then(getTodos).then(setTodos);
        }}
      >
        Incomplete
      </button>
      <button
        onClick={() => {
          removeTodos(checkedIds).then(getTodos).then(setTodos);
        }}
      >
        Delete
      </button>
      <h2>Add To Do Item:</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(taskInput).then(getTodos).then(setTodos);
          setTaskInput("");
        }}
      >
        <input
          type="text"
          id="taskInput"
          placeholder="Task"
          value={taskInput}
          onChange={(event) => {
            setTaskInput(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
