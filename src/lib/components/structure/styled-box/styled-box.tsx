import "./style/base.css";
import { IStyledBox } from "./types";

export default function StyledBox({
  children,
  className = "",
  tag = "div",
  bordered,
  dense,
  elevation,
  variant = "surface",
  severity = "base",
  ...domProps
}: IStyledBox) {
  const Component = tag;

  return (
    <Component
      {...domProps}
      className={`${className} styled-box${bordered ? " bordered" : ""}${
        dense ? " dense" : ""
      } ${variant} ${severity}
      ${elevation ? `elevated ${elevation}` : ""}`}
    >
      {children}
    </Component>
  );
}
