import { IFlexProps } from "./types";
import { IPTNode } from "@/lib/types/components-props";
import { handleTagProp } from "@/lib/utils/component_utility";
import {
  alignItemsTailwind,
  flexDirectionTailwind,
  flexWrapTailwind,
  justifyContentTailwind,
} from "@/lib/utils/tailwind_utility";
import { clsx } from "clsx";

export default function Flex<T extends IPTNode, RefType extends HTMLElement>({
  children,
  className = "",
  tag = "div",
  justify,
  align,
  direction,
  gap,
  wrap,
  ref,
  ...domProps
}: IFlexProps<T, RefType>) {
  const { component: Component, props: componentProps } = handleTagProp({
    tag,
  });

  const flexClassName = clsx(
    className,
    componentProps?.className,
    direction && flexDirectionTailwind[direction],
    wrap && flexWrapTailwind[wrap],
    justify && justifyContentTailwind[justify],
    align && alignItemsTailwind[align],
    gap,
    "flex"
  );

  return (
    <Component
      ref={ref}
      {...domProps}
      {...componentProps}
      className={flexClassName}
    >
      {children}
    </Component>
  );
}
