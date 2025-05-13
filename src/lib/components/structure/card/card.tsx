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
}: ICardProps) {
  const isSeparatorHeader =
    separator_header != undefined ? separator_header : separator;

  const isSeparatorFooter =
    separator_footer != undefined ? separator_footer : separator;

  return (
    <Box
      {...{
        bordered,
        flatted,
        dense,
        shadowed,
        className: `card ${className}`,
      }}
    >
      {/**********************Header Slot***************/}
      {slotHeader && (
        <>
          <Row className="card_header">{slotHeader}</Row>
          {isSeparatorHeader && <Separator></Separator>}
        </>
      )}
      {/**********************Default Slot***************/}
      {children && <Column className="card_body">{children}</Column>}
      {/**********************Footer Slot***************/}
      {slotFooter && (
        <>
          {isSeparatorFooter && <Separator></Separator>}
          <Row className="card_footer">{slotFooter}</Row>
        </>
      )}
    </Box>
  );
}
