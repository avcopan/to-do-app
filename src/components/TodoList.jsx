import { editTodosCompleted, removeTodos } from "../modules/request";
import { SelectorBox } from "./SelectorBox";
import { TodoItem } from "./TodoItem";
import { Icon } from "./Icon";

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
      <Icon.MarkComplete
        onClick={() => editTodosCompleted(checkedBoxes, true, refreshState)}
      />
      <Icon.MarkIncomplete
        onClick={() => editTodosCompleted(checkedBoxes, false, refreshState)}
      />
      <Icon.Remove
        onClick={() => removeTodos(checkedBoxes, refreshState)}
      />
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
