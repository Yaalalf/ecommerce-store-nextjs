import { IFlexProps } from "./types";
import { IPTNode } from "@/lib/types/components-props";
import {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
} from "@/lib/types/css";
import { handleTagProp } from "@/lib/utils/component_utility";

const flexDirection: Record<FlexDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};
const flexWrap: Record<FlexWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
};
const justifyContent: Record<JustifyContent, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "justify-stretch",
  "space-around": "justify-around",
  "space-between": "justify-between",
  "space-evenly": "justify-evenly",
};

const alignItems: Record<AlignItems, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

export default function Flex<T extends IPTNode>({
  children,
  className = "",
  tag = "div",
  justify = "start",
  align = "start",
  direction = "row",
  gap = "0",
  wrap = "nowrap",
  ...domProps
}: IFlexProps<T>) {
  const { component: Component, props: componentProps } = handleTagProp({
    tag,
  });

  return (
    <Component
      {...domProps}
      {...componentProps}
      className={`${className} flex ${flexDirection[direction]} ${flexWrap[wrap]} ${justifyContent[justify]} ${alignItems[align]} gap-${gap}`}
    >
      {children}
    </Component>
  );
}
