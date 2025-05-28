import { clsx } from "clsx";
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
  const componentClassName = clsx(
    "styled-box",
    variant,
    severity,
    className,
    bordered && "bordered",
    dense && "dense",
    elevation && `elevated  ${elevation}`
  );
  return (
    <Component {...domProps} className={componentClassName}>
      {children}
    </Component>
  );
}
