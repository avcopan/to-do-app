import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  let [checkedIds, setCheckedIds] = useState([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

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

  const deleteTodos = async (todos) => {
    try {
      const idCsv = checkedIds.join(",");
      console.log("End point", `/todo?ids=${idCsv}`);
      await axios.delete(`/todo?ids=${idCsv}`);
      await getTodos().then(setTodos);
    } catch (error) {
      throw new Error(error);
    }
  };

  const updateTaskInput = (event) => {
    setTaskInput(event.target.value);
  };

  const updateChecked = (event, id) => {
    if (event.target.checked && !checkedIds.includes(id)) {
      checkedIds.push(id);
    } else if (!event.target.checked) {
      checkedIds = checkedIds.filter((i) => i !== id);
    }
    console.log("Updating checkedIds:", checkedIds);
    setCheckedIds(checkedIds);
  };

  const markCheckedComplete = () => {
    console.log("Marking checked!");
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
      <button onClick={markCheckedComplete}>Mark Complete</button>
      <button onClick={() => deleteTodos(checkedIds)}>Delete</button>
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
