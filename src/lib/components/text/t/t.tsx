import { textAlignTailwind } from "@/lib/utils/tailwind_utility";
import { ITProps } from "./types";
import { clsx } from "clsx";

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

  const tClassName = clsx(
    "t",
    className,
    textVariant && `tv-${textVariant}`,
    severity,
    textAlign && textAlignTailwind[textAlign],
    size
  );

  return (
    <Component {...domProps} className={tClassName}>
      {children ? children : text}
    </Component>
  );
}
