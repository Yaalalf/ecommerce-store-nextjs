import { useMemo } from "react";
import useStyledBox, {
  styleFlattedBase,
  styleFlattedError,
  styleFlattedErrorContainer,
  styleFlattedPrimary,
  styleFlattedPrimaryContainer,
  styleFlattedInfo,
  styleFlattedInfoContainer,
  styleFlattedWarning,
  styleFlattedWarningContainer,
  styleFlattedSuccess,
  styleFlattedSuccessContainer,
  styleSurfaceBase,
  styleSurfaceError,
  styleSurfaceErrorContainer,
  styleSurfacePrimaryContainer,
  styleSurfaceInfo,
  styleSurfaceInfoContainer,
  styleSurfaceWarning,
  styleSurfaceWarningContainer,
  styleSurfaceSuccess,
  styleSurfaceSuccessContainer,
} from "../../structure/styled-box/use-styled-box";
import { tv } from "tailwind-variants";
import { IStyledBoxStyleProps } from "../../structure/styled-box/types";

export default function useStyledInput({
  bordered,
  dense,
  elevation,
  severity,
  variant,
  rounded,
}: Partial<IStyledBoxStyleProps>) {
  void bordered;
  const styledBox = useStyledBox();
  const styledInput = useMemo(
    () =>
      tv({
        slots: {
          inputContainer: [
            "shrink-0",
            "text-sm",
            "relative",
            "rounded-lg",
            "hover:cursor-text",
          ],
          inputNative: ["focus-visible:outline-0 grow-1"],
        },
        variants: {
          variant: {
            surface: "",
            outlined: {
              inputContainer: ["border-1", "border-solid"],
              buttonAction: ["data-[loading=true]:opacity-0"],
            },
            flatted: {
              inputContainer: [
                styledBox.variants.variant.flatted,
                "hover:has-[button[data-disabled=true]]:bg-transparent",
              ],
              buttonAction: ["data-[loading=true]:opacity-0"],
            },
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
            true: { inputContainer: ["py-2 px-2"] },
            false: { inputContainer: ["px-4 py-3"] },
          },
          rounded: {
            none: { inputContainer: [styledBox.variants.rounded.none] },
            sm: { inputContainer: [styledBox.variants.rounded.sm] },
            md: { inputContainer: [styledBox.variants.rounded.md] },
            lg: { inputContainer: [styledBox.variants.rounded.lg] },
            xl: { inputContainer: [styledBox.variants.rounded.xl] },
            full: { inputContainer: [styledBox.variants.rounded.full] },
          },
          elevation: {
            "level-0": {
              inputContainer: [styledBox.variants.elevation["level-0"]],
            },
            "level-1": {
              inputContainer: [styledBox.variants.elevation["level-1"]],
            },
            "level-2": {
              inputContainer: [styledBox.variants.elevation["level-2"]],
            },
            "level-3": {
              inputContainer: [styledBox.variants.elevation["level-3"]],
            },
            "level-4": {
              inputContainer: [styledBox.variants.elevation["level-4"]],
            },
          },
          size: {
            xs: { inputContainer: ["text-xs"] },
            sm: { inputContainer: ["text-sm"] },
            md: { inputContainer: ["text-base"] },
          },
        },
        compoundVariants: [
          //Surface Base
          {
            variant: "surface",
            severity: "base",
            class: {
              inputContainer: [...styleSurfaceBase, "hover:bg-white-base-600"],
            },
          },
          //Surface Primary
          {
            variant: "surface",
            severity: "primary",
            class: {
              inputContainer: [
                "bg-primary-700",
                "text-on-primary",
                "hover:bg-primary-500",
                "hover:outline-2",
                "hover:outline-primary-100/15",
                "hover:text-on-primary-600",
                "focus-within:bg-primary-600",
                "focus-within:text-on-primary-600",
                "focus-within:outline-2",
                "focus-within:outline-primary-100/15",
                "focus-within:hover:outline-primary-600/50",
                "focus-within:bg-primary-400",
                "focus-within:hover:bg-primary-400",
              ],
            },
          },
          //Surface Primary Container
          {
            variant: "surface",
            severity: "primary-container",
            class: {
              inputContainer: [
                ...styleSurfacePrimaryContainer,
                "hover:bg-primary-container-400",
              ],
            },
          },
          //Surface Error
          {
            variant: "surface",
            severity: "error",
            class: {
              inputContainer: [...styleSurfaceError, "hover:bg-error-400"],
            },
          },
          //Surface Error Container
          {
            variant: "surface",
            severity: "error-container",
            class: {
              inputContainer: [
                ...styleSurfaceErrorContainer,
                "hover:bg-error-container-400",
              ],
            },
          },
          //Surface Info
          {
            variant: "surface",
            severity: "info",
            class: {
              inputContainer: [...styleSurfaceInfo, "hover:bg-info-400"],
            },
          },
          //Surface Info Container
          {
            variant: "surface",
            severity: "info-container",
            class: {
              inputContainer: [
                ...styleSurfaceInfoContainer,
                "hover:bg-info-container-400",
              ],
            },
          },
          //Surface Warning
          {
            variant: "surface",
            severity: "warning",
            class: {
              inputContainer: [...styleSurfaceWarning, "hover:bg-warning-400"],
            },
          },
          //Surface Warning Container
          {
            variant: "surface",
            severity: "warning-container",
            class: {
              inputContainer: [
                ...styleSurfaceWarningContainer,
                "hover:bg-warning-container-400",
              ],
            },
          },
          //Surface Success
          {
            variant: "surface",
            severity: "success",
            class: {
              inputContainer: [...styleSurfaceSuccess, "hover:bg-success-400"],
            },
          },
          //Surface Success Container
          {
            variant: "surface",
            severity: "success-container",
            class: {
              inputContainer: [
                ...styleSurfaceSuccessContainer,
                "hover:bg-success-container-400",
              ],
            },
          },
          //Outlined Base
          {
            variant: "outlined",
            severity: "base",
            class: {
              inputContainer: [
                "border-black-base-950",
                "text-black-base-800",
                "focus-within:border-black-base-600",
                "focus-within:text-black-base-600",
                "focus-within:outline-2",
                "focus-within:outline-black-base-950/50",
                "focus-within:bg-black-base-950/5",
                "focus-within:hover:bg-black-base-950/5",
                "hover:bg-black-base-900/5",
                "hover:outline-2",
                "hover:outline-black-base-950/50",
              ],
            },
          },
          //Outlined Primary
          {
            variant: "outlined",
            severity: "primary",
            class: {
              inputContainer: [
                "border-primary-900",
                "text-primary-600",
                "focus-within:border-primary-600",
                "focus-within:text-primary-600",
                "focus-within:outline-2",
                "focus-within:outline-primary-600/50",
                "focus-within:hover:outline-primary-600/50",
                "focus-within:bg-primary-600/5",
                "focus-within:hover:bg-primary-600/5",
                "hover:bg-primary-600/5",
                "hover:outline-2",
                "hover:outline-primary-600/25",
              ],
            },
          },
          //Outlined Primary Container
          {
            variant: "outlined",
            severity: "primary-container",
            class: {
              inputContainer: [
                "border-primary-container",
                "text-on-primary-container",
                "focus-within:border-primary-container-600",
                "focus-within:text-on-primary-container-600",
                "focus-within:outline-2",
                "focus-within:outline-primary-container-600/50",
                "focus-within:hover:outline-primary-container-600/50",
                "focus-within:bg-primary-container-600/5",
                "focus-within:hover:bg-primary-container-600/5",
                "hover:bg-primary-container-600/5",
                "hover:outline-2",
                "hover:outline-primary-container-600/25",
              ],
            },
          },
          //Outlined Error
          {
            variant: "outlined",
            severity: "error",
            class: {
              inputContainer: [
                "border-error-800",
                "text-error-600",
                "focus-within:border-error-600",
                "focus-within:text-error-600",
                "focus-within:outline-2",
                "focus-within:outline-error-600/50",
                "focus-within:hover:outline-error-600/50",
                "focus-within:bg-error-600/5",
                "focus-within:hover:bg-error-600/5",
                "hover:bg-error-600/5",
                "hover:outline-2",
                "hover:outline-error-600/25",
              ],
            },
          },
          //Outlined Error Container
          {
            variant: "outlined",
            severity: "error-container",
            class: {
              inputContainer: [
                "border-error-container",
                "text-on-error-container",
                "focus-within:border-error-container-600",
                "focus-within:text-on-error-container-600",
                "focus-within:outline-2",
                "focus-within:outline-error-container-600/50",
                "focus-within:hover:outline-error-container-600/50",
                "focus-within:bg-error-container-600/5",
                "focus-within:hover:bg-error-container-600/5",
                "hover:bg-error-container-600/5",
                "hover:outline-2",
                "hover:outline-error-container-600/25",
              ],
            },
          },
          //Outlined Info
          {
            variant: "outlined",
            severity: "info",
            class: {
              inputContainer: [
                "border-info-700",
                "text-info-600",
                "focus-within:border-info-600",
                "focus-within:text-info-600",
                "focus-within:outline-2",
                "focus-within:outline-info-600/50",
                "focus-within:hover:outline-info-600/50",
                "focus-within:bg-info-600/5",
                "focus-within:hover:bg-info-600/5",
                "hover:bg-info-600/5",
                "hover:outline-2",
                "hover:outline-info-600/25",
              ],
            },
          },
          //Outlined Info Container
          {
            variant: "outlined",
            severity: "info-container",
            class: {
              inputContainer: [
                "border-info-container",
                "text-on-info-container",
                "focus-within:border-info-container-600",
                "focus-within:text-on-info-container-600",
                "focus-within:outline-2",
                "focus-within:outline-info-container-600/50",
                "focus-within:hover:outline-info-container-600/50",
                "focus-within:bg-info-container-600/5",
                "focus-within:hover:bg-info-container-600/5",
                "hover:bg-info-container-600/5",
                "hover:outline-2",
                "hover:outline-info-container-600/25",
              ],
            },
          },
          //Outlined Warning
          {
            variant: "outlined",
            severity: "warning",
            class: {
              inputContainer: [
                "border-warning-700",
                "text-warning-600",
                "focus-within:border-warning-600",
                "focus-within:text-warning-600",
                "focus-within:outline-2",
                "focus-within:outline-warning-600/50",
                "focus-within:hover:outline-warning-600/50",
                "focus-within:bg-warning-600/5",
                "focus-within:hover:bg-warning-600/5",
                "hover:bg-warning-600/5",
                "hover:outline-2",
                "hover:outline-warning-600/25",
              ],
            },
          },
          //Outlined Warning Container
          {
            variant: "outlined",
            severity: "warning-container",
            class: {
              inputContainer: [
                "border-warning-container",
                "text-on-warning-container",
                "focus-within:border-warning-container-600",
                "focus-within:text-on-warning-container-600",
                "focus-within:outline-2",
                "focus-within:outline-warning-container-600/50",
                "focus-within:hover:outline-warning-container-600/50",
                "focus-within:bg-warning-container-600/5",
                "focus-within:hover:bg-warning-container-600/5",
                "hover:bg-warning-container-600/5",
                "hover:outline-2",
                "hover:outline-warning-container-600/25",
              ],
            },
          },
          //Outlined Success
          {
            variant: "outlined",
            severity: "success",
            class: {
              inputContainer: [
                "border-success-700",
                "text-success-600",
                "focus-within:border-success-600",
                "focus-within:text-success-600",
                "focus-within:outline-2",
                "focus-within:outline-success-600/50",
                "focus-within:hover:outline-success-600/50",
                "focus-within:bg-warning-600/5",
                "focus-within:hover:bg-success-600/5",
                "hover:bg-success-600/5",
                "hover:outline-2",
                "hover:outline-success-600/25",
              ],
            },
          },
          //Outlined Success Container
          {
            variant: "outlined",
            severity: "success-container",
            class: {
              inputContainer: [
                "border-success-container",
                "text-on-success-container",
                "focus-within:border-success-container-600",
                "focus-within:text-on-success-container-600",
                "focus-within:outline-2",
                "focus-within:outline-success-container-600/50",
                "focus-within:hover:outline-success-container-600/50",
                "focus-within:bg-success-container-600/5",
                "focus-within:hover:bg-success-container-600/5",
                "hover:bg-success-container-600/5",
                "hover:outline-2",
                "hover:outline-success-container-600/25",
              ],
            },
          },
          //Flatted Base
          {
            variant: "flatted",
            severity: "base",
            class: {
              inputContainer: [
                ...styleFlattedBase,
                "hover:bg-black-base-300/15",
                "has-[button[data-disabled=true]]:text-black-base-900",
              ],
            },
          },
          //Flatted Primary
          {
            variant: "flatted",
            severity: "primary",
            class: {
              inputContainer: [
                ...styleFlattedPrimary,
                "hover:bg-primary-300/15",
                "has-[button[data-disabled=true]]:text-primary-900",
              ],
            },
          },
          //Flatted Primary Container
          {
            variant: "flatted",
            severity: "primary-container",
            class: {
              inputContainer: [
                ...styleFlattedPrimaryContainer,
                "hover:bg-primary-container-300/15",
                "has-[button[data-disabled=true]]:text-primary-container-900",
              ],
            },
          },
          //Flatted Error
          {
            variant: "flatted",
            severity: "error",
            class: {
              inputContainer: [
                ...styleFlattedError,
                "hover:bg-error-300/15",
                "has-[button[data-disabled=true]]:text-error-900",
              ],
            },
          },
          //Flatted Error Container
          {
            variant: "flatted",
            severity: "error-container",
            class: {
              inputContainer: [
                ...styleFlattedErrorContainer,
                "hover:bg-error-container-300/15",
                "has-[button[data-disabled=true]]:text-error-container-900",
              ],
            },
          },
          //Flatted Info
          {
            variant: "flatted",
            severity: "info",
            class: {
              inputContainer: [
                ...styleFlattedInfo,
                "hover:bg-info-300/15",
                "has-[button[data-disabled=true]]:text-info-900",
              ],
            },
          },
          //Flatted Info Container
          {
            variant: "flatted",
            severity: "info-container",
            class: {
              inputContainer: [
                ...styleFlattedInfoContainer,
                "hover:bg-info-container-300/15",
                "has-[button[data-disabled=true]]:text-info-container-900",
              ],
            },
          },
          //Flatted Warning
          {
            variant: "flatted",
            severity: "warning",
            class: {
              inputContainer: [
                ...styleFlattedWarning,
                "hover:bg-warning-300/15",
                "has-[button[data-disabled=true]]:text-warning-900",
              ],
            },
          },
          //Flatted Warning Container
          {
            variant: "flatted",
            severity: "warning-container",
            class: {
              inputContainer: [
                ...styleFlattedWarningContainer,
                "hover:bg-warning-container-300/15",
                "has-[button[data-disabled=true]]:text-warning-container-900",
              ],
            },
          },
          //Flatted Success
          {
            variant: "flatted",
            severity: "success",
            class: {
              inputContainer: [
                ...styleFlattedSuccess,
                "hover:bg-success-300/15",
                "has-[button[data-disabled=true]]:text-success-900",
              ],
            },
          },
          //Flatted Success Container
          {
            variant: "flatted",
            severity: "success-container",
            class: {
              inputContainer: [
                ...styleFlattedSuccessContainer,
                "hover:bg-success-container-300/15",
                "has-[button[data-disabled=true]]:text-success-container-900",
              ],
            },
          },
        ],
        defaultVariants: {
          variant: "surface",
          severity: "base",
          size: "xs",
          elevation: "level-0",
          rounded: "xl",
        },
      }),
    [
      styledBox.variants.elevation,
      styledBox.variants.rounded.full,
      styledBox.variants.rounded.lg,
      styledBox.variants.rounded.md,
      styledBox.variants.rounded.none,
      styledBox.variants.rounded.sm,
      styledBox.variants.rounded.xl,
      styledBox.variants.variant.flatted,
    ]
  );

  return styledInput({ variant, severity, dense, elevation, rounded });
}
