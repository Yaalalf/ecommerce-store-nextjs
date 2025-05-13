import { IFlexProps } from "./types";

export default function Flex({
  children,
  className = "",
  tag = "div",
  justify = "start",
  align = "start",
  direction = "row",
  gap = "0",
  ...domProps
}: IFlexProps) {
  const Component = tag;

  return (
    <Component
      {...domProps}
      className={`${className} full-width display-flex flex-direction-${direction} justify-content-${justify} align-items-${align} gap-${gap}`}
    >
      {children}
    </Component>
  );
}
