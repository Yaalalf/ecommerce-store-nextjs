import { IPTNode } from "@/lib/types/components-props";
import Flex from "../flex";
import { ICenterProps } from "./types";

export default function Center<T extends IPTNode, RefType extends HTMLElement>({
  children,
  className = "",
  tag,
  gap,
  ...domProps
}: ICenterProps<T, RefType>) {
  return (
    <Flex
      {...{ tag, justify: "center", align: "center", gap, ...domProps }}
      className={`${className} center`}
    >
      {children}
    </Flex>
  );
}
