import { IPTNode } from "@/lib/types/components-props";
import { IFlexProps } from "../flex/types";

export type IRowProps<T extends IPTNode> = Omit<IFlexProps<T>, "direction">;
