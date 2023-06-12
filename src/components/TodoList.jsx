import { TbTrash } from "react-icons/tb";
import { MdFormatStrikethrough, MdSettingsBackupRestore } from "react-icons/md";
import { editTodosCompleted, removeTodos } from "../modules/request";
import { TodoItem } from "./TodoItem";
import { SelectorBox } from "./SelectorBox";

export function TodoList({
  todos,
  checkedBoxes,
  setCheckedBoxes,
  refreshState,
}) {
  return (
    <div>
      <SelectorBox
        todos={todos}
        checkedBoxes={checkedBoxes}
        setCheckedBoxes={setCheckedBoxes}
      />
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
  );
}
