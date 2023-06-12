import { TbTrash } from "react-icons/tb";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdFormatStrikethrough,
  MdSettingsBackupRestore,
} from "react-icons/md";
import { editTodosCompleted, removeTodos } from "../modules/request";
import { TodoItem } from "./TodoItem";

export function TodoList({
  todos,
  checkedBoxes,
  setCheckedBoxes,
  refreshState,
}) {
  /** Toggle the state of all checkboxes
   *
   * @param {boolean} check - Whether to check or uncheck the boxes
   */
  const toggleCheckBoxes = (check = false) => {
    if (check) {
      // Check all boxes
      setCheckedBoxes(todos.map((todo) => todo.id));
    } else {
      // Uncheck all boxes
      setCheckedBoxes([]);
    }
  };

  return (
    <>
      <h2>Todo List:</h2>
      <div>
        {checkedBoxes.length === 0 ? (
          <MdOutlineCheckBoxOutlineBlank
            onClick={() => toggleCheckBoxes(true)}
          />
        ) : checkedBoxes.length === todos.length ? (
          <MdOutlineCheckBox onClick={() => toggleCheckBoxes(false)} />
        ) : (
          <MdOutlineIndeterminateCheckBox
            onClick={() => toggleCheckBoxes(false)}
          />
        )}
        <MdFormatStrikethrough
          onClick={() => editTodosCompleted(checkedBoxes, true, refreshState)}
        />
        <MdSettingsBackupRestore
          onClick={() => editTodosCompleted(checkedBoxes, false, refreshState)}
        />
        <TbTrash onClick={() => removeTodos(checkedBoxes, refreshState)} />
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            checkedBoxes={checkedBoxes}
            setCheckedBoxes={setCheckedBoxes}
            refreshState={refreshState}
          />
        ))}
      </div>
    </>
  );
}
