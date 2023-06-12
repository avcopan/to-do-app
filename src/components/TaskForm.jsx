import { useState } from "react";
import { addTodo } from "../modules/request";

export function TaskForm({ refreshState }) {
  // This will store the input for adding a new task
  const [taskInput, setTaskInput] = useState("");

  return (
    <>
      <h2>Add Task:</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTodo(taskInput, refreshState);
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
    </>
  );
}
