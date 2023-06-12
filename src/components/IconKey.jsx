import { Icon } from "./Icon";
import "./IconKey.css";

export function IconKey() {
  return (
    <div className="iconKey">
      <div>icons:</div>
      <div className="iconTable">
        <div className="iconColumn">
          <div>
            <Icon.MarkComplete clickable={false} /> mark complete
          </div>
          <div>
            <Icon.MarkIncomplete clickable={false} /> mark incomplete
          </div>
          <div>
            <Icon.Remove clickable={false} /> remove
          </div>
        </div>
        <div className="iconColumn">
          <div>
            <Icon.NoneSelected clickable={false} /> none selected (select all)
          </div>
          <div>
            <Icon.AllSelected clickable={false} /> all selected (select none)
          </div>
          <div>
            <Icon.SomeSelected clickable={false} /> some selected (select none)
          </div>
        </div>
      </div>
    </div>
  );
}
