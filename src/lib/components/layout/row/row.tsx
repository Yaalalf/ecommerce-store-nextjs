import Flex from "../flex";
import { IRowProps } from "./types";

export default function Row({
  children,
  className,
  tag,
  justify,
  align,
  gap,
  ...domProps
}: IRowProps) {
  return (
    <Flex
      {...{ tag, justify, align, gap, ...domProps }}
      className={`row ${className}`}
    >
      {children}
    </Flex>
  );
}
