import { useState } from "react";
import { addTodo } from "../modules/request";
import "./TaskForm.css";

export function TaskForm({ refreshState }) {
  // This will store the input for adding a new task
  const [taskInput, setTaskInput] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        addTodo(taskInput, refreshState);
        setTaskInput("");
      }}
      className="taskForm"
    >
      <textarea
        placeholder="Describe the next task"
        value={taskInput}
        onChange={(event) => {
          setTaskInput(event.target.value);
        }}
      />
      <button type="submit" title="add task">+</button>
    </form>
  );
}
