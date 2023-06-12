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

  if (checkedBoxes.length === 0) {
    // If no boxes are checked, use an empty checkbox icon with an onClick to
    // select all
    return (
      <MdOutlineCheckBoxOutlineBlank onClick={() => toggleCheckBoxes(true)} />
    );
  } else if (checkedBoxes.length === todos.length) {
    // If all boxes are checked, use a checked checkbox icon with an onClick to
    // select none
    return <MdOutlineCheckBox onClick={() => toggleCheckBoxes(false)} />;
  } else {
    // If some boxes are checked, use an indeterminate checkbox icon with an
    // onClick to select none
    return (
      <MdOutlineIndeterminateCheckBox onClick={() => toggleCheckBoxes(false)} />
    );
  }
}
