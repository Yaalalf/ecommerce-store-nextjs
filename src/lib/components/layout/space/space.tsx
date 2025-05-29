import { clsx } from "clsx";
import { ISpaceProps } from "./types";
import { twMerge } from "tailwind-merge";

export default function Space({ className, ...domProps }: ISpaceProps) {
  const spaceClassName = clsx("space", twMerge("grow", className));

  return <div {...domProps} className={spaceClassName}></div>;
}
