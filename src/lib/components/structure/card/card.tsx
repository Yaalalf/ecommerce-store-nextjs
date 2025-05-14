import "./style/base.css";
import { Box, Column, Row } from "../../layout";
import Separator from "../separator";
import { ICardProps } from "./types";

export default function Card({
  bordered,
  children,
  className = "",
  dense,
  flatted,
  separator,
  separator_footer,
  separator_header,
  shadowed,

  slotFooter,
  slotHeader,
  pt,
}: ICardProps) {
  const isSeparatorHeader =
    separator_header != undefined ? separator_header : separator;

  const isSeparatorFooter =
    separator_footer != undefined ? separator_footer : separator;

  return (
    <Box
      {...pt?.root}
      {...{
        bordered,
        flatted,
        dense,
        shadowed,
        className: `card ${className} ${pt?.root?.className}`,
      }}
    >
      {/**********************Header Slot***************/}
      {slotHeader && (
        <>
          <Row
            {...pt?.header}
            className={`card_header ${pt?.header?.className || ""}`}
          >
            {slotHeader}
          </Row>
          {isSeparatorHeader && <Separator></Separator>}
        </>
      )}
      {/**********************Default Slot***************/}
      {children && (
        <Column
          {...pt?.body}
          className={`card_body ${pt?.body?.className || ""}`}
        >
          {children}
        </Column>
      )}
      {/**********************Footer Slot***************/}
      {slotFooter && (
        <>
          {isSeparatorFooter && <Separator></Separator>}
          <Row
            {...pt?.footer}
            className={`card_footer ${pt?.footer?.className || ""}`}
          >
            {slotFooter}
          </Row>
        </>
      )}
    </Box>
  );
}
