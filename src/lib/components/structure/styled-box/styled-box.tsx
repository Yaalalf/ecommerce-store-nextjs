import "./style/base.css";
import { IStyledBox } from "./types";

export default function StyledBox({
  children,
  className = "",
  tag = "div",
  bordered,
  dense,
  flatted,
  elevation = "level-0",
  variant = "surface",
  severity = "base",
  ...domProps
}: IStyledBox) {
  const Component = tag;

  return (
    <Component
      {...domProps}
      className={`${className} styled-box ${bordered ? "bordered" : ""} ${
        dense ? "dense" : ""
      } ${flatted ? "flatted" : ""} 
      ${elevation} ${variant} ${severity}`}
    >
      {children}
    </Component>
  );
}
