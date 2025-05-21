import { IHProps } from "./types";

export default function H({
  children,
  text,
  type = "h2",
  textVariant,
  className = "",
  textAlign = "start",
  ...domProps
}: IHProps) {
  const Component = type;

  return (
    <Component
      {...domProps}
      className={`${className} h tv-${
        textVariant || type
      } text-align-${textAlign}`}
    >
      {children ? children : text}
    </Component>
  );
}
