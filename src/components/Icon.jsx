import { TbTrash } from "react-icons/tb";
import {
  MdOutlineCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdOutlineIndeterminateCheckBox,
  MdFormatStrikethrough,
  MdSettingsBackupRestore,
} from "react-icons/md";
import "./Icon.css";

export function MarkComplete({ onClick, className }) {
  return (
    <MdFormatStrikethrough
      title={onClick && "mark complete"}
      className={`${className} ${onClick && "clickable"}`}
      onClick={onClick}
    />
  );
}

export function MarkIncomplete({ onClick, className }) {
  return (
    <MdSettingsBackupRestore
      title={onClick && "mark incomplete"}
      className={`${className} ${onClick && "clickable"}`}
      onClick={onClick}
    />
  );
}

export function Remove({ onClick, className }) {
  return (
    <TbTrash
      title={onClick && "remove"}
      className={`${className} ${onClick && "clickable"}`}
      onClick={onClick}
    />
  );
}

export function NoneSelected({ onClick, className }) {
  return (
    <MdOutlineCheckBoxOutlineBlank
      title={onClick && "select all"}
      className={`${className} ${onClick && "clickable"}`}
      onClick={onClick}
    />
  );
}

export function AllSelected({ onClick, className }) {
  return (
    <MdOutlineCheckBox
      title={onClick && "select none"}
      className={`${className} ${onClick && "clickable"}`}
      onClick={onClick}
    />
  );
}

export function SomeSelected({ onClick, className }) {
  return (
    <MdOutlineIndeterminateCheckBox
      title={onClick && "select none"}
      className={`${className} ${onClick && "clickable"}`}
      onClick={onClick}
    />
  );
}

export const Icon = {
  MarkComplete,
  MarkIncomplete,
  Remove,
  NoneSelected,
  AllSelected,
  SomeSelected,
};
