import { TbTrash } from "react-icons/tb";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdFormatStrikethrough,
  MdSettingsBackupRestore,
} from "react-icons/md";
import "./IconKey.css";

export function IconKey() {
  return (
    <div className="iconKey">
      <div>icons:</div>
      <div className="iconTable">
        <div className="iconColumn">
          <div>
            <MdFormatStrikethrough /> mark complete
          </div>
          <div>
            <MdSettingsBackupRestore /> mark incomplete
          </div>
          <div>
            <TbTrash /> remove
          </div>
        </div>
        <div className="iconColumn">
          <div>
            <MdOutlineCheckBoxOutlineBlank /> none selected (select all)
          </div>
          <div>
            <MdOutlineCheckBox /> all selected (select none)
          </div>
          <div>
            <MdOutlineIndeterminateCheckBox /> some selected (select none)
          </div>
        </div>
      </div>
    </div>
  );
}
