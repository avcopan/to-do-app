import { useState } from "react";
import { addTodo } from "../modules/request";
import { Icon } from "./Icon";
import "./TaskForm.css";

export function TaskForm({ refreshState }) {
  // This will store the input for adding a new task
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = () => {
    addTodo(taskInput, refreshState);
    setTaskInput("");
  };

  const submitOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="taskForm">
      <textarea
        placeholder="Enter a new task"
        value={taskInput}
        onChange={(event) => {
          setTaskInput(event.target.value);
        }}
        onKeyDown={submitOnEnter}
      />
      <Icon.Add
        onClick={handleSubmit}
        className="taskFormButton"
       />
    </div>
  );
}
