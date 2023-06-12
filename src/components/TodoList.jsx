import { useState } from "react";
import { TbTrash } from "react-icons/tb";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdFormatStrikethrough,
  MdSettingsBackupRestore,
} from "react-icons/md";
import {
  editTodoCompleted,
  editTodosCompleted,
  removeTodo,
  removeTodos,
} from "../modules/request";


export function TodoList({ todos, checkedBoxes, setCheckedBoxes, refreshState }) {
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
        {todos.map((todo) => {
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
                      onClick={() =>
                        editTodoCompleted(todo.id, todo, refreshState)
                      }
                    />
                  ) : (
                    <MdFormatStrikethrough
                      onClick={() =>
                        editTodoCompleted(todo.id, todo, refreshState)
                      }
                    />
                  )}

                  <TbTrash onClick={() => removeTodo(todo.id, refreshState)} />
                </>
              )}
            </div>
          );
        })}
      </div>
      <br />
      <div>
        <div>
          <MdFormatStrikethrough /> = mark complete
        </div>
        <div>
          <MdSettingsBackupRestore /> = mark incomplete
        </div>
        <div>
          <TbTrash /> = remove
        </div>
      </div>
    </>
  );
}
