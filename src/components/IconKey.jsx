import { TbTrash } from "react-icons/tb";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdFormatStrikethrough,
  MdSettingsBackupRestore,
} from "react-icons/md";

export function IconKey() {
  return (
    <>
      <h4>Icons</h4>
      <div>
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
        <div>
          <div>
            <MdOutlineCheckBoxOutlineBlank /> = none selected (click to select
            all)
          </div>
          <div>
            <MdOutlineCheckBox /> = all selected (click to select none)
          </div>
          <div>
            <MdOutlineIndeterminateCheckBox /> = some selected (click to select
            none)
          </div>
        </div>
      </div>
    </>
  );
}
