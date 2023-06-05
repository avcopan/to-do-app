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

  const updateTodos = () => {
    getTodos().then(setTodos);
  };

  const updateCheckedIds = (event, id) => {
    if (event.target.checked) {
      checkedIds.push(id);
    } else {
      checkedIds = checkedIds.filter((i) => i !== id);
    }
    console.log("Updating checkedIds:", checkedIds);
    setCheckedIds(checkedIds);
  };

  /** Check/uncheck all checkboxes
   * 
   * @param {*} value 
   */
  const toggleCheckboxesAndCheckedIds = (value) => {
    // First, toggle the checkboxes
    document
      .querySelectorAll("input[type=checkbox]")
      .forEach((element) => (element.checked = value));
    // Then, update the checkedIds accordingly
    checkedIds = value ? todos.map(todo => todo.id) : [];
    console.log("Toggling checkedIds:", checkedIds);
    setCheckedIds(checkedIds);
  }

  useEffect(() => {
    updateTodos();
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
                id={todo.id}
                key={todo.id}
                onChange={(event) => updateCheckedIds(event, todo.id)}
              />
              <span className={todo.completed ? "completedTask" : "task"}>
                {todo.task}
              </span>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => editTodosCompleted(checkedIds, true).then(updateTodos)}
      >
        Complete
      </button>
      <button
        onClick={() => editTodosCompleted(checkedIds, false).then(updateTodos)}
      >
        Incomplete
      </button>
      <button onClick={() => removeTodos(checkedIds).then(updateTodos)}>
        Delete
      </button>
      <br />
      <button onClick={() => toggleCheckboxesAndCheckedIds(true)}>
        Select All
      </button>
      <button onClick={() => toggleCheckboxesAndCheckedIds(false)}>
        Select None
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
