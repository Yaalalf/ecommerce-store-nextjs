import { ITProps } from "./types";

export default function T({
  children,
  text,
  type = "p",
  className = "",
  textStyle,
  ...domProps
}: ITProps) {
  const Component = type;

  return (
    <Component
      {...domProps}
      className={`${className} t text-${textStyle || type}`}
    >
      {children ? children : text}
    </Component>
  );
}
