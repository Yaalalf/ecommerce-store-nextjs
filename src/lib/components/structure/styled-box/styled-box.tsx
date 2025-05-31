import { IStyledBox } from "./types";
import useStyledBox from "./use-styled-box";
import { twMerge } from "tailwind-merge";

export default function StyledBox({
  children,
  className = "",
  tag = "div",

  variant,
  severity,
  rounded,
  bordered,
  dense,
  elevation,
  ...domProps
}: IStyledBox) {
  const Component = tag;
  void bordered;
  const boxStyles = useStyledBox()({
    variant,
    severity,
    dense,
    elevation,
    rounded,
  });

  return (
    <Component
      {...domProps}
      className={twMerge(boxStyles, "styled-box", className)}
    >
      {children}
    </Component>
  );
}
