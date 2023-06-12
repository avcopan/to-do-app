import { useState } from "react";
import { addTodo } from "../modules/request";
import "./TaskForm.css";

export function TaskForm({ refreshState }) {
  // This will store the input for adding a new task
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo(taskInput, refreshState);
    setTaskInput("");
  };

  const submitOnEnter = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="taskForm">
      <textarea
        placeholder="Describe the next task"
        value={taskInput}
        onChange={(event) => {
          setTaskInput(event.target.value);
        }}
        onKeyDown={submitOnEnter}
      />
      <button type="submit" title="add task">
        +
      </button>
    </form>
  );
}
