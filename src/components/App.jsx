import { useState, useEffect } from "react";
import { getTodos } from "../modules/request";
import { Header } from "./Header";
import { TodoList } from "./TodoList";
import { TaskForm } from "./TaskForm";
import { IconKey } from "./IconKey";
import "./App.css";

function App() {
  // This will store the to do list
  const [todos, setTodos] = useState([]);
  // This will store checked boxes by ID
  const [checkedBoxes, setCheckedBoxes] = useState([]);

  /** Refresh the state of the to do list and the check boxes
   */
  const refreshState = () => {
    getTodos().then(setTodos);
    setCheckedBoxes([]);
  };

  // Make sure we refresh the state upon page load/reload
  useEffect(() => {
    refreshState();
  }, []);

  return (
    <div>
      <header className="addMargin todoHeader">
        <Header title="todo list" />
        <TaskForm refreshState={refreshState} />
      </header>
      <main className="addMargin">
        <TodoList
          todos={todos}
          checkedBoxes={checkedBoxes}
          setCheckedBoxes={setCheckedBoxes}
          refreshState={refreshState}
        />
      </main>
      <footer className="addMargin">
        <IconKey />
      </footer>
    </div>
  );
}

export default App;
