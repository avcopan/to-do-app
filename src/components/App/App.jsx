import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [checked, setChecked] = useState(new Set());
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

  const updateTaskInput = (event) => {
    setTaskInput(event.target.value);
  };

  const updateChecked = (event, todoId) => {
    if (event.target.checked) {
      checked.add(todoId)
      setChecked(checked);
      console.log("Adding item to checked!")
      console.log(checked);
    } else {
      checked.delete(todoId)
      setChecked(checked);
      console.log("Removing item from checked!")
      console.log(checked);
    }
  }

  return (
    <div>
      <h1>To Do App</h1>
      <h2>To Do List:</h2>
      <div>
        {todoList.map((todo) => {
          return (
            <div key={"parent" + todo.id}>
              <input
                type="checkbox"
                key={todo.id}
                onClick={(e) => updateChecked(e, todo.id)}
              />
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
          onChange={updateTaskInput}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
