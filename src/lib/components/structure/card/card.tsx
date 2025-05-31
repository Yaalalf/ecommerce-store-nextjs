// import "./style/base.css";
import { Column } from "../../layout";
import Separator from "../separator";
import { ICardProps } from "./types";
import StyledBox from "../styled-box";

export default function Card({
  bordered,
  children,
  className = "",
  dense,
  inset,
  separator,
  separator_footer,
  separator_header,
  elevation,
  severity,
  rounded,
  variant = "surface",
  slotFooter,
  slotHeader,
  pt,
}: ICardProps) {
  const isSeparatorHeader =
    separator_header != undefined ? separator_header : separator;

  const isSeparatorFooter =
    separator_footer != undefined ? separator_footer : separator;

  const denseClassName = `${dense ? "p-0" : "p-5"}`;

  const rootClassName = `card ${className} ${
    pt?.root?.className || ""
  } overflow-hidden`;
  const headerClassName = `card-header ${
    pt?.header?.className || ""
  } ${denseClassName} pb-0`;
  const bodyClassName = `card-body ${
    pt?.body?.className || ""
  } ${denseClassName}`;
  const footerClassName = `card-footer ${
    pt?.footer?.className || ""
  } ${denseClassName} pt-0`;
  return (
    <Column
      tag={{
        component: StyledBox,
        props: {
          ...pt?.root,
          ...{
            bordered,
            dense: true,
            elevation,
            severity,
            variant,
            rounded,
            className: `${rootClassName}`,
          },
        },
      }}
    >
      {/**********************Header Slot***************/}
      {slotHeader && (
        <>
          <Column {...pt?.header} className={`${headerClassName}`}>
            {slotHeader}
          </Column>
          {isSeparatorHeader && <Separator inset={inset} />}
        </>
      )}
      {/**********************Default Slot***************/}
      {children && (
        <Column {...pt?.body} className={`${bodyClassName}`}>
          {children}
        </Column>
      )}
      {/**********************Footer Slot***************/}
      {slotFooter && (
        <>
          {isSeparatorFooter && <Separator inset={inset} />}
          <Column {...pt?.footer} className={`${footerClassName}`}>
            {slotFooter}
          </Column>
        </>
      )}
    </Column>
  );
}
