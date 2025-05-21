import { ITProps } from "./types";

export default function T({
  children,
  text,
  type = "p",
  className = "",
  textVariant,
  textAlign = "start",
  ...domProps
}: ITProps) {
  const Component = type;

  return (
    <Component
      {...domProps}
      className={`${className} t tv-${
        textVariant || type
      } text-align-${textAlign}`}
    >
      {children ? children : text}
    </Component>
  );
}
