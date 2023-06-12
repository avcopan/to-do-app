import { useState } from "react";
import { editTodoCompleted, removeTodo } from "../modules/request";
import { Icon } from "./Icon";
import "./TodoItem.css";

export function TodoItem({
  todo,
  checkedBoxes,
  setCheckedBoxes,
  refreshState,
}) {
  // This will store the id of the item currently being hovered over
  const [hoverId, setHoverId] = useState();

  /** Toggle the state of an individual checkbox
   *
   * @param {number} todoId - The ID of the todo item whose box will be checked
   */
  const toggleCheckBox = (todoId) => {
    if (checkedBoxes.includes(todoId)) {
      // Uncheck this box
      setCheckedBoxes(checkedBoxes.filter((id) => id !== todoId));
    } else {
      // Check this box
      setCheckedBoxes([...checkedBoxes, todoId]);
    }
  };

  return (
    <div
      key={todo.id}
      onMouseEnter={() => setHoverId(todo.id)}
      onMouseLeave={() => setHoverId()}
      className="todoItem"
    >
      <input
        type="checkbox"
        key={todo.id}
        onChange={() => toggleCheckBox(todo.id)}
        checked={checkedBoxes.includes(todo.id)}
      />
      {todo.completed ? (
        <Icon.MarkIncomplete
          onClick={() => editTodoCompleted(todo.id, todo, refreshState)}
          className={todo.id != hoverId && "hide"}
        />
      ) : (
        <Icon.MarkComplete
          onClick={() => editTodoCompleted(todo.id, todo, refreshState)}
          className={todo.id != hoverId && "hide"}
        />
      )}

      <span className={`task ${todo.completed && "completed"}`}>
        {todo.task}
      </span>
      <Icon.Remove
        onClick={() => removeTodo(todo.id, refreshState)}
        className={`alignBottom ${todo.id != hoverId && "hide"}`}
      />
    </div>
  );
}
