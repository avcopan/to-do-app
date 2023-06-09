import { useState, useEffect } from "react";
import "./App.css";
import { TbPencilMinus, TbPencilPlus, TbTrash } from "react-icons/tb";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
} from "react-icons/md";
import {
  getTodos,
  addTodo,
  editTodoCompleted,
  editTodosCompleted,
  removeTodo,
  removeTodos,
} from "../modules/request";

function App() {
  // This will store the to do list
  const [todos, setTodos] = useState([]);
  // This will store checked boxes by ID
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  // This will store the input for adding a new task
  const [taskInput, setTaskInput] = useState("");
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

  /** Refresh the state of the to do list and the check boxes
   */
  const refreshState = () => {
    getTodos().then(setTodos);
    toggleCheckBoxes(false);
  };

  // Make sure we refresh the state upon page load/reload
  useEffect(() => {
    refreshState();
  }, []);

  return (
    <div>
      <h1>To Do App</h1>
      <h2>To Do List:</h2>
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
        <TbTrash />
        <TbPencilMinus />
        <TbPencilPlus />
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
                    <TbPencilPlus
                      onClick={() =>
                        editTodoCompleted(todo.id, todo, refreshState)
                      }
                    />
                  ) : (
                    <TbPencilMinus
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
      <button
        onClick={() => editTodosCompleted(checkedBoxes, true, refreshState)}
      >
        Complete
      </button>
      <button
        onClick={() => editTodosCompleted(checkedBoxes, false, refreshState)}
      >
        Incomplete
      </button>
      <button onClick={() => removeTodos(checkedBoxes, refreshState)}>
        Delete
      </button>
      <br />
      <h2>Add To Do Item:</h2>
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
    </div>
  );
}

export default App;
