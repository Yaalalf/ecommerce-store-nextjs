import {
  AlignItems,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  TextAlign,
} from "../types/css";

export const textAlignTailwind: Record<TextAlign, string> = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
  justify: "text-justify",
};

export const flexDirectionTailwind: Record<FlexDirection, string> = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse",
};
export const flexWrapTailwind: Record<FlexWrap, string> = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
};
export const justifyContentTailwind: Record<JustifyContent, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  stretch: "justify-stretch",
  "space-around": "justify-around",
  "space-between": "justify-between",
  "space-evenly": "justify-evenly",
};

export const alignItemsTailwind: Record<AlignItems, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};
