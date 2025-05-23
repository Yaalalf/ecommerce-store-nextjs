import { Column } from "@/lib/components/layout";
import IHSubProps from "./types";
import { H } from "@/lib/components/text";
import { textAlignTailwind } from "@/lib/utils/tailwind_utility";

export default function HSub({
  className,
  heading,
  subheading,
  textAlign,
  reverse,
  pt,
  gap = "gap-[4px]",
}: IHSubProps) {
  return (
    <Column
      {...pt?.container}
      className={`h-sub ${pt?.container?.className || className} ${
        textAlign ? textAlignTailwind[textAlign] : ""
      }`}
      gap={pt?.container?.gap || gap}
      reverse={pt?.container?.reverse || reverse}
    >
      <H
        {...pt?.heading}
        className={`h-sub-heading w-full ${pt?.heading?.className || ""} `}
        type={pt?.heading?.type || "h2"}
      >
        {heading}
      </H>
      <H
        {...pt?.subheading}
        className={`h-sub-subheading w-full ${pt?.subheading?.className || ""}`}
        type={pt?.subheading?.type || "h3"}
      >
        {subheading}
      </H>
    </Column>
  );
}
