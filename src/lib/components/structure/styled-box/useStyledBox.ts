import { useMemo } from "react";
import { tv } from "tailwind-variants";

/**
 * Utility Classes for StyledBox of variant surface
 * the principal use is to provide a consistent design system
 * and the use of background and text colors
 */
export const styleSurfaceBase = ["bg-white-base-950", "text-black-base-500"];
export const styleSurfacePrimary = ["bg-primary", "text-on-primary"];
export const styleSurfacePrimaryContainer = [
  "bg-primary-container",
  "text-on-primary-container",
];
export const styleSurfaceError = ["bg-error", "text-on-error"];
export const styleSurfaceErrorContainer = [
  "bg-error-container",
  "text-on-error-container",
];
/**
 * Utility Classes for StyledBox of variant outlined
 * the principal use is to provide a consistent design system
 * and the use of background and text colors
 */
export const styleOutlinedBase = [
  "border-black-base-500",
  "text-black-base-500",
];
export const styleOutlinedPrimary = ["border-primary", "text-primary"];
export const styleOutlinedPrimaryContainer = [
  "border-primary-container",
  "text-on-primary-container",
];
export const styleOutlinedError = ["border-error", "text-error"];
export const styleOutlinedErrorContainer = [
  "border-error-container",
  "text-on-error-container",
];

/**
 * Utility Classes for StyledBox of variant flatted
 * the principal use is to provide a consistent design system
 * and the use of background and text colors
 */
export const styleFlattedBase = ["text-black-base"];
export const styleFlattedPrimary = ["text-primary"];
export const styleFlattedPrimaryContainer = ["text-primary-container"];
export const styleFlattedError = ["text-error"];
export const styleFlattedErrorContainer = ["text-on-error-container"];

export default function useStyledBox() {
  const styledBox = useMemo(
    () =>
      tv({
        variants: {
          variant: {
            surface: "",
            outlined: ["border-2", "border-solid"],
            flatted: ["bg-transparent"],
          },
          severity: {
            base: "",
            primary: "",
            "primary-container": "",
            error: "",
            "error-container": "",
          },
          dense: {
            true: ["py-2 px-2"],
            false: ["p-5"],
          },
          rounded: {
            none: ["rounded-none"],
            sm: ["rounded-sm"],
            md: ["rounded-md"],
            lg: ["rounded-lg"],
            xl: ["rounded-xl"],
            full: ["rounded-full"],
          },
          elevation: {
            "level-0": ["shadow-none"],

            "level-1": ["shadow-2xs"],

            "level-2": ["shadow-xs"],

            "level-3": ["shadow-sm"],

            "level-4": ["shadow-md"],
          },
        },
        compoundVariants: [
          //Surface Base
          {
            variant: "surface",
            severity: "base",
            class: styleSurfaceBase,
          },
          //Surface Primary
          {
            variant: "surface",
            severity: "primary",
            class: styleSurfacePrimary,
          },
          //Surface Primary Container
          {
            variant: "surface",
            severity: "primary-container",
            class: styleSurfacePrimaryContainer,
          },
          //Surface Error
          {
            variant: "surface",
            severity: "error",
            class: styleSurfaceError,
          },
          //Surface Error Container
          {
            variant: "surface",
            severity: "error-container",
            class: styleSurfaceErrorContainer,
          },
          //Outlined Base
          {
            variant: "outlined",
            severity: "base",
            class: styleOutlinedBase,
          },
          //Outlined Primary
          {
            variant: "outlined",
            severity: "primary",
            class: styleOutlinedPrimary,
          },
          //Outlined Primary Container
          {
            variant: "outlined",
            severity: "primary-container",
            class: [styleOutlinedPrimaryContainer],
          },
          //Outlined Error
          {
            variant: "outlined",
            severity: "error",
            class: styleOutlinedError,
          },
          //Outlined Error Container
          {
            variant: "outlined",
            severity: "error-container",
            class: styleOutlinedErrorContainer,
          },
          //Flatted Base
          {
            variant: "flatted",
            severity: "base",
            class: styleFlattedBase,
          },
          //Flatted Primary
          {
            variant: "flatted",
            severity: "primary",
            class: styleFlattedPrimary,
          },
          //Flatted Primary Container
          {
            variant: "flatted",
            severity: "primary-container",
            class: styleFlattedPrimaryContainer,
          },
          //Flatted Error
          {
            variant: "flatted",
            severity: "error",
            class: styleFlattedError,
          },
          //Flatted Error Container
          {
            variant: "flatted",
            severity: "error-container",
            class: styleFlattedErrorContainer,
          },
        ],
        defaultVariants: {
          variant: "surface",
          severity: "base",
          elevation: "level-0",
          rounded: "xl",
        },
      }),
    []
  );

  return styledBox;
}
