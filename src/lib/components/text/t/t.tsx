import { ITProps } from "./types";
import useStyledText from "../use-styled-text";

export default function T({
  children,
  text,
  type = "p",
  className,
  textVariant,
  textAlign,
  size,
  severity,
  ...domProps
}: ITProps) {
  const Component = type;

  const tStyles = useStyledText()({
    textVariant: textVariant || type,
    severity,
    size,
    textAlign,
    className: ["h", className],
  });

  return (
    <Component {...domProps} className={tStyles}>
      {children ? children : text}
    </Component>
  );
}
