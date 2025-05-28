import { Beside } from "@/lib/components/structure";
import { IHeadingProps } from "./types";
import { clsx } from "clsx";
import { Column } from "@/lib/components/layout";
import { H } from "@/lib/components/text";

export default function Heading({
  className,
  heading,
  subheading,
  slotBefore,
  slotHeading,
  slotSubHeading,
  slotAfter,
  pt,
}: IHeadingProps) {
  const rootClassName = clsx(
    "heading",
    className,
    pt?.root?.className,
    "w-full items-center"
  );
  const headingContainerClassName = clsx(
    "heading-container",
    pt?.headingContainer?.className,
    "grow"
  );
  const headingClassName = clsx("heading-heading", pt?.heading?.className);
  const subheadingClassName = clsx(
    "heading-subheading",
    pt?.subheading?.className
  );
  return (
    <Beside
      {...pt?.root}
      slotAfter={slotAfter}
      slotBefore={slotBefore}
      className={rootClassName}
    >
      <Column {...pt?.headingContainer} className={headingContainerClassName}>
        {slotHeading || (
          <H
            {...pt?.heading}
            className={headingClassName}
            textVariant={pt?.heading?.textVariant || "heading"}
          >
            {heading}
          </H>
        )}
        {slotSubHeading || (
          <H
            {...pt?.subheading}
            className={subheadingClassName}
            textVariant={pt?.subheading?.textVariant || "subheading"}
          >
            {subheading}
          </H>
        )}
      </Column>
    </Beside>
  );
}
