import Flex from "../flex";
import { IColumnProps } from "./types";

export default function Column({
  children,
  className,
  tag,
  justify,
  align,
  gap,
  ...domProps
}: IColumnProps) {
  return (
    <Flex
      {...{ tag, justify, align, gap, ...domProps, direction: "column" }}
      className={`column ${className}`}
    >
      {children}
    </Flex>
  );
}
