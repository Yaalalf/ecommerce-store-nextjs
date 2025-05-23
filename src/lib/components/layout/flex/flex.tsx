import { IFlexProps } from "./types";
import { IPTNode } from "@/lib/types/components-props";
import { handleTagProp } from "@/lib/utils/component_utility";
import {
  alignItemsTailwind,
  flexDirectionTailwind,
  flexWrapTailwind,
  justifyContentTailwind,
} from "@/lib/utils/tailwind_utility";

export default function Flex<T extends IPTNode>({
  children,
  className = "",
  tag = "div",
  justify,
  align,
  direction,
  gap,
  wrap,
  ...domProps
}: IFlexProps<T>) {
  const { component: Component, props: componentProps } = handleTagProp({
    tag,
  });

  const classNameCompound =
    (direction ? `${flexDirectionTailwind[direction]} ` : "") +
    (wrap ? `${flexWrapTailwind[wrap]} ` : "") +
    (justify ? `${justifyContentTailwind[justify]} ` : "") +
    (align ? `${alignItemsTailwind[align]} ` : "") +
    (gap || "");

  return (
    <Component
      {...domProps}
      {...componentProps}
      className={`${className} ${
        componentProps?.className || ""
      } flex ${classNameCompound}`}
    >
      {children}
    </Component>
  );
}
