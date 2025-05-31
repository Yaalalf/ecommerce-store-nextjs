import { IHProps } from "./types";
import useStyledText from "../use-styled-text";

export default function H({
  children,
  text,
  type = "h2",
  textVariant,
  className,
  textAlign,
  size,
  severity,
  ...domProps
}: IHProps) {
  const Component = type;

  const hStyles = useStyledText()({
    textVariant: textVariant || type,
    severity,
    size,
    textAlign,
    className: ["h", className],
  });

  return (
    <Component {...domProps} className={hStyles}>
      {children ? children : text}
    </Component>
  );
}
