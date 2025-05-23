import { textAlignTailwind } from "@/lib/utils/tailwind_utility";
import { IHProps } from "./types";

export default function H({
  children,
  text,
  type = "h2",
  textVariant,
  className = "",
  textAlign,
  size,
  severity,
  ...domProps
}: IHProps) {
  const Component = type;

  return (
    <Component
      {...domProps}
      className={`${className} h tv-${textVariant || type} ${severity || ""} ${
        textAlign ? textAlignTailwind[textAlign] : ""
      } ${size || ""}`}
    >
      {children ? children : text}
    </Component>
  );
}
