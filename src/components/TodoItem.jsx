import { useState } from "react";
import { TbTrash } from "react-icons/tb";
import { MdFormatStrikethrough, MdSettingsBackupRestore } from "react-icons/md";
import { editTodoCompleted, removeTodo } from "../modules/request";

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
    >
      <input
        type="checkbox"
        key={todo.id}
        onChange={() => toggleCheckBox(todo.id)}
        checked={checkedBoxes.includes(todo.id)}
      />
      <span className={todo.completed ? "completedTask" : "task"}>
        {todo.task}
      </span>
      {hoverId === todo.id && (
        <>
          {todo.completed ? (
            <MdSettingsBackupRestore
              onClick={() => editTodoCompleted(todo.id, todo, refreshState)}
            />
          ) : (
            <MdFormatStrikethrough
              onClick={() => editTodoCompleted(todo.id, todo, refreshState)}
            />
          )}

          <TbTrash onClick={() => removeTodo(todo.id, refreshState)} />
        </>
      )}
    </div>
  );
}
