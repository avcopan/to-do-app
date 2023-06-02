import { useState, useEffect } from "react";
import axios from "axios";

const getTodos = () => {
  return axios
    .get("/todo")
    .then((res) => res.data)
    .catch((error) => console.error(error));
};

function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getTodos().then(setTodoList);
  }, []);
  console.log(todoList);

  return (
    <div>
      <h1>TO DO APP</h1>
      <h2>To Do List:</h2>
      <div>
        {todoList.map((todo) => {
          return (
            <div key={todo.id}>
                {todo.task} ({todo.completed ? 'Done' : 'Not done'})
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
