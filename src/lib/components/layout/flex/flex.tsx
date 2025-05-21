import { IFlexProps } from "./types";
import { IPTNode } from "@/lib/types/components-props";
import { handleTagProp } from "@/lib/utils/component_utility";

export default function Flex<T extends IPTNode>({
  children,
  className = "",
  tag = "div",
  justify = "start",
  align = "start",
  direction = "row",
  gap = "0",
  wrap = "unwrap",
  reverse = false,
  ...domProps
}: IFlexProps<T>) {
  const { component: Component, props: componentProps } = handleTagProp({
    tag,
  });

  return (
    <Component
      {...domProps}
      {...componentProps}
      className={`${className} display-flex flex-direction-${direction} ${
        reverse ? "flex-direction-reverse" : ""
      } justify-content-${justify} align-items-${align} gap-${gap} flex-wrap-${wrap}`}
    >
      {children}
    </Component>
  );
}
