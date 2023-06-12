import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
} from "react-icons/md";

export function SelectorBox({ todos, checkedBoxes, setCheckedBoxes }) {
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
      {checkedBoxes.length === 0 ? (
        <MdOutlineCheckBoxOutlineBlank onClick={() => toggleCheckBoxes(true)} />
      ) : checkedBoxes.length === todos.length ? (
        <MdOutlineCheckBox onClick={() => toggleCheckBoxes(false)} />
      ) : (
        <MdOutlineIndeterminateCheckBox
          onClick={() => toggleCheckBoxes(false)}
        />
      )}
    </>
  );
}
