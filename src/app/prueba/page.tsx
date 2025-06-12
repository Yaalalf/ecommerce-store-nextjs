"use client";
import { Card, Column, H, List, StyledBox } from "@/lib/components";
import HSub from "@/lib/components/blocks/headings/h-sub/h-sub";
import Button from "@/lib/components/button";
import { useNotification } from "@/lib/components/popups/components/notification/use-notification";

import {
  StyledBoxElevation,
  StyledBoxSeverity,
  StyledBoxVariant,
  TextVariant,
} from "@/lib/types/css";
import { useRef } from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function TestPage() {
  const {
    /*addNotification*/
  } = useNotification();

  const variants: StyledBoxVariant[] = ["surface", "outlined", "flatted"];
  const severities: StyledBoxSeverity[] = [
    "base",
    "primary",
    "primary-container",
    "error",
    "error-container",
    "info",
    "info-container",
    "warning",
    "warning-container",
    "success",
    "success-container",
  ];

  const dataButton: {
    variant: StyledBoxVariant;
    severity: StyledBoxSeverity;
  }[] = [];

  const dataStyledBox: {
    variant: StyledBoxVariant;
    severity: StyledBoxSeverity;
    elevation?: StyledBoxElevation;
  }[] = [];

  variants.forEach((variant) => {
    severities.forEach((severity) => {
      dataButton.push({ variant, severity });
      dataStyledBox.push({ variant, severity });
    });
  });

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

  // const [isDialog, setIsDialog] = useState(false);
  const ref = useRef(null);
  return (
    <div className="w-full h-full bg-[#eaeaea] py-40">
      <Column
        className="w-full h-auto pt-[40px]"
        align="center"
        gap="gap-[20px]"
      >
        <Button
          ref={ref}
          icon={<FaPlusCircle />}
          onClick={() => {
            // setIsDialog(!isDialog);
            // addNotification({
            //   title: "Para cambiar la info toque en ella",
            //   subtitle:
            //     "cambiando la informacion de la notification para arreglos subsecuentes",
            //   type: "error",
            // });
          }}
          variant={"surface"}
          severity={"primary"}
        >
          {/* Popover
          <Popover
            canTriggerParent
            open={isDialog}
            onClose={() => {
              setIsDialog(false);
            }}
            anchor="bottom"
            pivot="top"
            strategy="absolute"
          >
            <StyledBox elevation="level-4"></StyledBox>
          </Popover> */}
          {/* <Dialog canTriggerParent>
            <StyledBox>Hola Mundo</StyledBox>
          </Dialog> */}
        </Button>

        <Column gap="gap-[20px]" className="w-[90%]">
          <H>Styled Box</H>
          <List
            className="w-[100%] "
            data={dataButton}
            gap="gap-[20px]"
            direction="row"
            wrap="wrap"
            align="center"
          >
            {(item) => (
              <>
                <Button
                  label={`${item.variant} ${item.severity}`}
                  icon={<FaPlusCircle />}
                  onClick={() => {
                    // setIsDialog(!isDialog);
                    // addNotification({
                    //   title: "Para cambiar la info toque en ella",
                    //   subtitle:
                    //     "cambiando la informacion de la notification para arreglos subsecuentes",
                    //   type: "error",
                    // });
                  }}
                  variant={item.variant}
                  severity={item.severity}
                ></Button>
                {/* <Button
                  label={`${item.variant} ${item.severity}`}
                  icon={<FaPlusCircle />}
                  loading
                  variant={item.variant}
                  severity={item.severity}
                ></Button>
                <Button
                  label={`${item.variant} ${item.severity}`}
                  icon={<FaPlusCircle />}
                  disabled
                  variant={item.variant}
                  severity={item.severity}
                ></Button> */}
              </>
            )}
          </List>
        </Column>

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
