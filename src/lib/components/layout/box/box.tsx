import "./style/base.css";
import { IBox } from "./types";

export default function Box({
  children,
  className = "",
  tag = "div",
  bordered,
  dense,
  flatted,
  shadowed,
  ...domProps
}: IBox) {
  const Component = tag;

  return (
    <Component
      {...domProps}
      className={`${className} box w-full ${bordered ? "bordered" : ""} ${
        dense ? "dense" : ""
      } ${flatted ? "flatted" : ""} ${shadowed ? "shadowed" : ""}`}
    >
      {children}
    </Component>
  );
}
