import { textAlignTailwind } from "@/lib/utils/tailwind_utility";
import { ITProps } from "./types";

export default function T({
  children,
  text,
  type = "p",
  className = "",
  textVariant,
  textAlign,
  size,
  severity,
  ...domProps
}: ITProps) {
  const Component = type;

  return (
    <Component
      {...domProps}
      className={`${className} t tv-${textVariant || type} ${severity || ""} ${
        textAlign ? textAlignTailwind[textAlign] : ""
      } ${size || ""}`}
    >
      {children ? children : text}
    </Component>
  );
}
