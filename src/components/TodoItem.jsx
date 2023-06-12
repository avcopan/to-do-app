import { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { MdFormatStrikethrough, MdSettingsBackupRestore } from "react-icons/md";
import { editTodoCompleted, removeTodo } from "../modules/request";
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
        <MdSettingsBackupRestore
          onClick={() => editTodoCompleted(todo.id, todo, refreshState)}
          className={todo.id != hoverId && "hide"}
        />
      ) : (
        <MdFormatStrikethrough
          onClick={() => editTodoCompleted(todo.id, todo, refreshState)}
          className={todo.id != hoverId && "hide"}
        />
      )}

      <span className={`task ${todo.completed && 'completed'}`}>
        {todo.task}
      </span>
      <TbTrash
        onClick={() => removeTodo(todo.id, refreshState)}
        className={`alignBottom ${todo.id != hoverId && "hide"}`}
      />
    </div>
  );
}
