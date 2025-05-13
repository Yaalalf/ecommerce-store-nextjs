import { IFlexProps } from "../flex/types";

export type ICenterProps = Omit<IFlexProps, "direction" | "align" | "justify">;
