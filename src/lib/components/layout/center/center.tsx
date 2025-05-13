import Flex from "../flex";
import { ICenterProps } from "./types";

export default function Center({
  children,
  className,
  tag,
  gap,
  ...domProps
}: ICenterProps) {
  return (
    <Flex
      {...{ tag, justify: "center", align: "center", gap, ...domProps }}
      className={`row ${className}`}
    >
      {children}
    </Flex>
  );
}
