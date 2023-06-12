import { useState, useEffect } from "react";
import { getTodos } from "../modules/request";
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
      <h1>todo list</h1>
      <TodoList
        todos={todos}
        checkedBoxes={checkedBoxes}
        setCheckedBoxes={setCheckedBoxes}
        refreshState={refreshState}
      />
      <IconKey />
      <TaskForm refreshState={refreshState} />
    </div>
  );
}

export default App;
