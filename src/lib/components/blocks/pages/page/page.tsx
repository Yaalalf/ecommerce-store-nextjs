import { clsx } from "clsx";
import { Column, Row } from "../../../layout";
import { IPageProps } from "./types";
import { twMerge } from "tailwind-merge";

export default function Page({
  slotHeader,
  slotBody,
  slotFooter,
  className,
  pt,
}: IPageProps) {
  const rootClassName = twMerge(
    "page",
    className,
    pt?.root?.className,
    "w-[100%]",
    "min-h-[100vh]"
  );
  const headerClassName = clsx("page-header", pt?.header?.className);
  const bodyClassName = clsx("page-body", pt?.footer?.className);
  const footerClassName = clsx("page-footer", pt?.footer?.className);

  return (
    <Column {...pt?.root} className={rootClassName}>
      {slotHeader && (
        <Row {...pt?.header} className={headerClassName}>
          {slotHeader}
        </Row>
      )}
      {slotBody && (
        <Column {...pt?.body} className={`${bodyClassName}`}>
          {slotBody}
        </Column>
      )}
      {slotFooter && (
        <Column {...pt?.footer} className={`${footerClassName}`}>
          {slotFooter}
        </Column>
      )}
    </Column>
  );
}
