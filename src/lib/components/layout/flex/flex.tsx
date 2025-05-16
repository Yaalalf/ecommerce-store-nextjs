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
  ...domProps
}: IFlexProps<T>) {
  const { component: Component, props: componentProps } = handleTagProp({
    tag,
  });

  return (
    <Component
      {...domProps}
      {...componentProps}
      className={`${className} full-width display-flex flex-direction-${direction} justify-content-${justify} align-items-${align} gap-${gap}`}
    >
      {children}
    </Component>
  );
}
