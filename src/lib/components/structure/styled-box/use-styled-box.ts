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
export const styleSurfaceInfo = ["bg-info", "text-on-info"];
export const styleSurfaceInfoContainer = [
  "bg-info-container",
  "text-on-info-container",
];
export const styleSurfaceWarning = ["bg-warning", "text-on-warning"];
export const styleSurfaceWarningContainer = [
  "bg-warning-container",
  "text-on-warning-container",
];
export const styleSurfaceSuccess = ["bg-success", "text-on-success"];
export const styleSurfaceSuccessContainer = [
  "bg-success-container",
  "text-on-success-container",
];
/**
 * Utility Classes for StyledBox of variant outlined
 * the principal use is to provide a consistent design system
 * and the use of background and text colors
 */
export const styleOutlined = ["border-2", "border-solid"];
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
export const styleOutlinedInfo = ["border-info", "text-info"];
export const styleOutlinedInfoContainer = [
  "border-info-container",
  "text-on-info-container",
];
export const styleOutlinedWarning = ["border-warning", "text-warning"];
export const styleOutlinedWarningContainer = [
  "border-warning-container",
  "text-on-warning-container",
];
export const styleOutlinedSuccess = ["border-success", "text-success"];
export const styleOutlinedSuccessContainer = [
  "border-success-container",
  "text-on-success-container",
];

/**
 * Utility Classes for StyledBox of variant flatted
 * the principal use is to provide a consistent design system
 * and the use of background and text colors
 */

export const styleFlatted = ["bg-transparent"];
export const styleFlattedBase = ["text-black-base"];
export const styleFlattedPrimary = ["text-primary"];
export const styleFlattedPrimaryContainer = ["text-primary-container"];
export const styleFlattedError = ["text-error"];
export const styleFlattedErrorContainer = ["text-on-error-container"];
export const styleFlattedInfo = ["text-info"];
export const styleFlattedInfoContainer = ["text-info-container"];
export const styleFlattedWarning = ["text-warning"];
export const styleFlattedWarningContainer = ["text-on-warning-container"];
export const styleFlattedSuccess = ["text-success"];
export const styleFlattedSuccessContainer = ["text-on-success-container"];

export default function useStyledBox() {
  const styledBox = useMemo(
    () =>
      tv({
        variants: {
          variant: {
            surface: "",
            outlined: styleOutlined,
            flatted: styleFlatted,
          },
          severity: {
            base: "",
            primary: "",
            "primary-container": "",
            error: "",
            "error-container": "",
            info: "",
            "info-container": "",
            warning: "",
            "warning-container": "",
            success: "",
            "success-container": "",
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
          //Surface Info
          {
            variant: "surface",
            severity: "info",
            class: styleSurfaceInfo,
          },
          //Surface Info Container
          {
            variant: "surface",
            severity: "info-container",
            class: styleSurfaceInfoContainer,
          },
          //Surface Warning
          {
            variant: "surface",
            severity: "warning",
            class: styleSurfaceWarning,
          },
          //Surface Warning Container
          {
            variant: "surface",
            severity: "warning-container",
            class: styleSurfaceWarningContainer,
          },
          //Surface Success
          {
            variant: "surface",
            severity: "success",
            class: styleSurfaceSuccess,
          },
          //Surface Success Container
          {
            variant: "surface",
            severity: "success-container",
            class: styleSurfaceSuccessContainer,
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
            class: styleOutlinedPrimaryContainer,
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
          //Outlined Info
          {
            variant: "outlined",
            severity: "info",
            class: styleOutlinedInfo,
          },
          //Outlined Info Container
          {
            variant: "outlined",
            severity: "info-container",
            class: styleOutlinedInfoContainer,
          },
          //Outlined Warning
          {
            variant: "outlined",
            severity: "warning",
            class: styleOutlinedWarning,
          },
          //Outlined Warning Container
          {
            variant: "outlined",
            severity: "warning-container",
            class: styleOutlinedWarningContainer,
          },
          //Outlined Success
          {
            variant: "outlined",
            severity: "success",
            class: styleOutlinedSuccess,
          },
          //Outlined Success Container
          {
            variant: "outlined",
            severity: "success-container",
            class: styleOutlinedSuccessContainer,
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
          //Flatted Info
          {
            variant: "flatted",
            severity: "info",
            class: styleFlattedInfo,
          },
          //Flatted Info Container
          {
            variant: "flatted",
            severity: "info-container",
            class: styleFlattedInfoContainer,
          },
          //Flatted Warning
          {
            variant: "flatted",
            severity: "warning",
            class: styleFlattedWarning,
          },
          //Flatted Warning Container
          {
            variant: "flatted",
            severity: "warning-container",
            class: styleFlattedWarningContainer,
          },
          //Flatted Success
          {
            variant: "flatted",
            severity: "success",
            class: styleFlattedSuccess,
          },
          //Flatted Success Container
          {
            variant: "flatted",
            severity: "success-container",
            class: styleFlattedSuccessContainer,
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
