import { Icon } from "./Icon";
import "./SelectorBox.css";

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
      <Icon.NoneSelected
        onClick={() => toggleCheckBoxes(true)}
        className="imitateCheckbox"
      />
    );
  } else if (checkedBoxes.length === todos.length) {
    // If all boxes are checked, use a checked checkbox icon with an onClick to
    // select none
    return (
      <Icon.AllSelected
        onClick={() => toggleCheckBoxes(false)}
        className="imitateCheckbox"
      />
    );
  } else {
    // If some boxes are checked, use an indeterminate checkbox icon with an
    // onClick to select none
    return (
      <Icon.SomeSelected
        onClick={() => toggleCheckBoxes(false)}
        className="imitateCheckbox"
      />
    );
  }
}
