import { useState, useEffect } from "react";
import "./App.css";
import {
  getTodos,
  addTodo,
  editTodosCompleted,
  removeTodos,
} from "../api/agent";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [checkedIds, setCheckedIds] = useState([]);

  const refreshState = () => {
    getTodos().then(setTodos);
    toggleCheckedIds(false);
  };

  const toggleCheckedIds = (check = false) => {
    if (check) {
      setCheckedIds(todos.map((todo) => todo.id));
    } else {
      setCheckedIds([]);
    }
  };

  const toggleCheckedId = (todoId) => {
    if (checkedIds.includes(todoId)) {
      setCheckedIds(checkedIds.filter((id) => id !== todoId));
    } else {
      setCheckedIds([...checkedIds, todoId]);
    }
  };

  useEffect(() => {
    refreshState();
  }, []);

  return (
    <div>
      <h1>To Do App</h1>
      <h2>To Do List:</h2>
      <div>
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <input
                type="checkbox"
                key={todo.id}
                onChange={() => toggleCheckedId(todo.id)}
                checked={checkedIds.includes(todo.id)}
              />
              <span className={todo.completed ? "completedTask" : "task"}>
                {todo.task}
              </span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => editTodosCompleted(checkedIds, true).then(refreshState)}
      >
        Complete
      </button>
      <button
        onClick={() => editTodosCompleted(checkedIds, false).then(refreshState)}
      >
        Incomplete
      </button>
      <button onClick={() => removeTodos(checkedIds).then(refreshState)}>
        Delete
      </button>
      <br />
      <button onClick={() => toggleCheckedIds(true)}>Select All</button>
      <button onClick={() => toggleCheckedIds(false)}>Select None</button>
      <h2>Add To Do Item:</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(taskInput).then(refreshState);
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
