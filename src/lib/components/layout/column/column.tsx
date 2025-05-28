import { IPTNode } from "@/lib/types/components-props";
import Flex from "../flex";
import { IColumnProps } from "./types";
import clsx from "clsx";

export default function Column<T extends IPTNode, RefType extends HTMLElement>({
  children,
  className = "",
  tag,
  justify,
  align,
  gap,
  wrap,
  reverse = false,
  ...domProps
}: IColumnProps<T, RefType>) {
  const columnClassName = clsx("column", className);
  return (
    <Flex
      {...{
        tag,
        justify,
        align,
        gap,
        wrap,
        ...domProps,
        direction: reverse ? "column-reverse" : "column",
      }}
      className={columnClassName}
    >
      {children}
    </Flex>
  );
}
