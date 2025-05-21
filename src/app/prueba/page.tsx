"use client";
import { Column, H, List, StyledBox } from "@/lib/components";
import HSub from "@/lib/components/blocks/headings/h-sub/h-sub";
import {
  StyledBoxSeverity,
  StyledBoxVariant,
} from "@/lib/components/structure/styled-box/types";
import { TextVariant } from "@/lib/types/css";

export default function TestPage() {
  const dataStyledBox: {
    variant: StyledBoxVariant;
    severity: StyledBoxSeverity;
  }[] = [
    { variant: "surface", severity: "base" },
    { variant: "surface", severity: "primary" },
    { variant: "surface", severity: "primary-container" },
    { variant: "surface", severity: "error" },
    { variant: "surface", severity: "error-container" },
  ];

  const dataHeaderTextStyle: TextVariant[] = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "body1",
    "body2",
    "caption",
    "overline",
    "label",
    "heading",
    "subheading",
    "title",
    "subtitle1",
    "subtitle2",
    "hero",
  ];

  return (
    <div className="w-full h-full bg-[#eaeaea]">
      <Column className="w-full h-screen pt-[40px]" align="center" gap="40">
        <Column gap="20" className="w-[90%]">
          <H>Styled Box</H>
          <List
            className="w-[100%]"
            data={dataStyledBox}
            gap="20"
            direction="row"
            wrap="wrap"
          >
            {(item) => (
              <StyledBox
                className="w-[300px]"
                variant={item.variant}
                severity={item.severity}
              >
                {item.variant + " " + item.severity}
              </StyledBox>
            )}
          </List>
        </Column>
        <Column gap="20" className="w-[90%]">
          <H>Header Styles</H>
          <List
            className="w-[100%]"
            data={dataHeaderTextStyle}
            gap="20"
            direction="row"
            wrap="wrap"
            align="baseline"
          >
            {(item) => <H textVariant={item}>{item}</H>}
          </List>
        </Column>
        <HSub
          className="w-[500px]"
          heading="Find the right influencer for your business"
          subheading="There are many variations of passages of lorem ipsum available"
          textAlign="start"
          pt={{
            heading: {
              textVariant: "hero",
            },
            subheading: {
              textVariant: "body1",
            },
          }}
        />
      </Column>
    </div>
  );
}
