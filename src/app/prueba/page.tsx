"use client";
import { Card, Column, H, List, StyledBox } from "@/lib/components";
import HSub from "@/lib/components/blocks/headings/h-sub/h-sub";
import Button from "@/lib/components/button";

import {
  StyledBoxElevation,
  StyledBoxSeverity,
  StyledBoxVariant,
  TextVariant,
} from "@/lib/types/css";
import { FaPlusCircle } from "react-icons/fa";

export default function TestPage() {
  const dataStyledBox: {
    variant: StyledBoxVariant;
    severity: StyledBoxSeverity;
    elevation?: StyledBoxElevation;
  }[] = [
    { variant: "surface", severity: "base" },
    { variant: "surface", severity: "primary" },
    { variant: "surface", severity: "primary-container" },
    { variant: "surface", severity: "error" },
    { variant: "surface", severity: "error-container" },
    { variant: "outlined", severity: "base" },
    { variant: "outlined", severity: "primary" },
    { variant: "outlined", severity: "primary-container" },
    { variant: "outlined", severity: "error" },
    { variant: "outlined", severity: "error-container" },
    { variant: "flatted", severity: "base" },
    { variant: "flatted", severity: "primary" },
    { variant: "flatted", severity: "primary-container" },
    { variant: "flatted", severity: "error" },
    { variant: "flatted", severity: "error-container" },
    { variant: "surface", severity: "base", elevation: "level-0" },
    { variant: "surface", severity: "base", elevation: "level-1" },
    { variant: "surface", severity: "base", elevation: "level-2" },
    { variant: "surface", severity: "base", elevation: "level-3" },
    { variant: "surface", severity: "base", elevation: "level-4" },
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
    <div className="w-full h-full bg-[#eaeaea] py-40">
      <Column
        className="w-full h-auto pt-[40px]"
        align="center"
        gap="gap-[20px]"
      >
        <Button
          label="Search Files"
          elevation="level-0"
          icon={<FaPlusCircle />}
        ></Button>
        <Column gap="gap-[20px]" className="w-[90%]">
          <H>Styled Box</H>
          <List
            className="w-[100%] "
            data={dataStyledBox}
            gap="gap-[20px]"
            direction="row"
            wrap="wrap"
          >
            {(item) => (
              <StyledBox
                className="w-[300px]"
                variant={item.variant}
                severity={item.severity}
                elevation={item.elevation}
              >
                {item.variant + " " + item.severity}
              </StyledBox>
            )}
          </List>
        </Column>
        <Column gap="gap-[20px]" className="w-[90%]">
          <H>Header Styles</H>
          <List
            className="w-[100%]"
            data={dataHeaderTextStyle}
            gap="gap-[20px]"
            direction="row"
            wrap="wrap"
            align="baseline"
          >
            {(item) => <H textVariant={item}>{item}</H>}
          </List>
        </Column>
        <HSub
          className="lg:w-[500px] w-[80%] text-center lg:text-start"
          heading="Find the right influencer for your business"
          subheading="Test text refers to placeholder or filler text that is used to simulate real content in the early stages of a project."
          pt={{
            heading: {
              textVariant: "hero",
              severity: "base",
            },
            subheading: {
              textVariant: "body1",
            },
          }}
        />

        <Card
          className="gap-0"
          slotHeader="Buenas que tal soy un header"
          slotFooter="Esto es un footer"
          variant="surface"
          severity="primary-container"
          pt={{ header: { className: "bg-primary text-on-primary" } }}
        >
          Hola mundo que tal
        </Card>
        <StyledBox
          className="border-1 w-[90%] lg:w-[500px]"
          variant="outlined"
          severity="primary-container"
        >
          <HSub
            heading="Find the right influencer for your business"
            subheading="Test text refers to placeholder or filler text that is used to simulate real content in the early stages of a project."
            pt={{
              heading: {
                textVariant: "hero",
                severity: "base",
              },
              subheading: {
                textVariant: "body1",
                severity: "base",
              },
            }}
          />
        </StyledBox>
      </Column>
    </div>
  );
}
