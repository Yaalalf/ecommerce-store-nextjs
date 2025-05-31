export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexWrap = "wrap" | "nowrap";
export type JustifyContent =
  | "start"
  | "center"
  | "end"
  | "space-around"
  | "space-between"
  | "space-evenly"
  | "stretch";
export type AlignItems = "start" | "center" | "end" | "stretch" | "baseline";

type CSSUnits = "px" | "%" | "vw" | "vh" | "em" | "rem";
export type TailwindGap = `gap-${number | `[${number}${CSSUnits}]`}`;
export type TextSize = "small" | "medium" | "high";
export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "body1"
  | "body2"
  | "caption"
  | "overline"
  | "label"
  | "heading"
  | "subheading"
  | "title"
  | "subtitle1"
  | "subtitle2"
  | TextVariantWeb;

export type TextSeverity = StyledBoxSeverity | "on-primary";

export type TextVariantWeb = "hero";

export type TextAlign = "start" | "center" | "end" | "justify";

export type StyledBoxVariant = "surface" | "outlined" | "flatted";

export type StyledBoxSeverity =
  | "base"
  | "primary"
  | "primary-container"
  | "error"
  | "error-container";
export type StyledBoxElevation =
  | "level-0"
  | "level-1"
  | "level-2"
  | "level-3"
  | "level-4";

export type StyledBoxRounded = "none" | "sm" | "md" | "lg" | "xl" | "full";
