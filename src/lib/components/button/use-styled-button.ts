import { tv } from "tailwind-variants";
import { IStyledButtonProps } from "./types";
import { useMemo } from "react";
import useStyledBox, {
  styleFlattedBase,
  styleFlattedError,
  styleFlattedErrorContainer,
  styleFlattedPrimary,
  styleFlattedPrimaryContainer,
  styleOutlinedBase,
  styleOutlinedError,
  styleOutlinedPrimary,
  styleSurfaceBase,
  styleSurfaceError,
  styleSurfaceErrorContainer,
  styleSurfacePrimary,
  styleSurfacePrimaryContainer,
} from "../structure/styled-box/useStyledBox";

export default function useStyledButton({
  bordered,
  dense,
  elevation,
  severity,
  variant,
  size,
  rounded,
}: Partial<IStyledButtonProps>) {
  void bordered;
  const styledBox = useStyledBox();
  const styledButton = useMemo(
    () =>
      tv({
        slots: {
          buttonContainer: [
            "transition-[scale,background]",
            "duration-150",
            "has-[button:active]:scale-[0.98]",
            "text-sm",
            "relative",
            "overflow-hidden",
            "rounded-lg",
          ],
          buttonAction: [
            "hover:cursor-pointer",
            "gap-1",
            "relative",
            "select-none",
          ],
          buttonRipple: [],
          buttonLoading: [
            "absolute",
            "inset-0",
            "w-full",
            "h-full",
            "cursor-wait",
          ],
          buttonDisabled: [
            "absolute",
            "inset-0",
            "w-full",
            "h-full",
            "cursor-not-allowed",
          ],
        },
        variants: {
          variant: {
            surface: "",
            outlined: {
              buttonContainer: [styledBox.variants.variant.outlined],
              buttonAction: ["data-[loading=true]:opacity-0"],
            },
            flatted: {
              buttonContainer: [
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
          },
          dense: {
            true: { buttonAction: ["py-2 px-2"] },
            false: { buttonAction: ["px-4 py-3"] },
          },
          rounded: {
            none: { buttonContainer: [styledBox.variants.rounded.none] },
            sm: { buttonContainer: [styledBox.variants.rounded.sm] },
            md: { buttonContainer: [styledBox.variants.rounded.md] },
            lg: { buttonContainer: [styledBox.variants.rounded.lg] },
            xl: { buttonContainer: [styledBox.variants.rounded.xl] },
            full: { buttonContainer: [styledBox.variants.rounded.full] },
          },
          elevation: {
            "level-0": {
              buttonContainer: [styledBox.variants.elevation["level-0"]],
            },
            "level-1": {
              buttonContainer: [styledBox.variants.elevation["level-1"]],
            },
            "level-2": {
              buttonContainer: [styledBox.variants.elevation["level-2"]],
            },
            "level-3": {
              buttonContainer: [styledBox.variants.elevation["level-3"]],
            },
            "level-4": {
              buttonContainer: [styledBox.variants.elevation["level-4"]],
            },
          },
          size: {
            xs: { buttonContainer: ["text-xs"] },
            sm: { buttonContainer: ["text-sm"] },
            md: { buttonContainer: ["text-base"] },
          },
        },
        compoundVariants: [
          //Surface Base
          {
            variant: "surface",
            severity: "base",
            class: {
              buttonContainer: [...styleSurfaceBase, "hover:bg-white-base-600"],
              buttonAction: ["data-[disabled=true]:bg-white-base-600"],
              buttonRipple: ["bg-black-base-800/15"],
              buttonLoading: ["bg-white-base-950"],
            },
          },
          //Surface Primary
          {
            variant: "surface",
            severity: "primary",
            class: {
              buttonContainer: [...styleSurfacePrimary, "hover:bg-primary-400"],
              buttonRipple: ["bg-on-primary/25"],
              buttonLoading: ["bg-primary"],
              buttonAction: ["data-[disabled=true]:bg-primary-300"],
            },
          },
          //Surface Primary Container
          {
            variant: "surface",
            severity: "primary-container",
            class: {
              buttonContainer: [
                ...styleSurfacePrimaryContainer,
                "hover:bg-primary-container-400",
              ],
              buttonRipple: ["bg-on-primary-container/25"],
              buttonLoading: ["bg-primary-container"],
              buttonAction: ["data-[disabled=true]:bg-primary-container-300"],
            },
          },
          //Surface Error
          {
            variant: "surface",
            severity: "error",
            class: {
              buttonContainer: [...styleSurfaceError, "hover:bg-error-400"],
              buttonRipple: ["bg-on-error/25"],
              buttonLoading: ["bg-error"],
              buttonAction: ["data-[disabled=true]:bg-error-300"],
            },
          },
          //Surface Error Container
          {
            variant: "surface",
            severity: "error-container",
            class: {
              buttonContainer: [
                ...styleSurfaceErrorContainer,
                "hover:bg-error-container-400",
              ],
              buttonRipple: ["bg-on-error-container/25"],
              buttonLoading: ["bg-error-container"],
              buttonAction: ["data-[disabled=true]:bg-error-container-300"],
            },
          },
          //Outlined Base
          {
            variant: "outlined",
            severity: "base",
            class: {
              buttonContainer: [
                ...styleOutlinedBase,
                "hover:border-black-base-800",
                "hover:text-black-base-800",
                "has-[button[data-disabled=true]]:border-black-base-950",
                "has-[button[data-disabled=true]]:text-black-base-950",
                "hover:has-[button[data-loading=true]]:border-black-base-500",
                "hover:has-[button[data-loading=true]]:text-black-base-500",
              ],
              buttonRipple: ["bg-black-base-500/15"],
            },
          },
          //Outlined Primary
          {
            variant: "outlined",
            severity: "primary",
            class: {
              buttonContainer: [
                styleOutlinedPrimary,
                "hover:border-primary-400",
                "hover:text-primary-400",
                "has-[button[data-disabled=true]]:border-primary-800",
                "has-[button[data-disabled=true]]:text-primary-800",
                "hover:has-[button[data-loading=true]]:border-primary",
                "hover:has-[button[data-loading=true]]:text-primary",
              ],
              buttonRipple: ["bg-primary-500/15"],
            },
          },
          //Outlined Primary Container
          {
            variant: "outlined",
            severity: "primary-container",
            class: {
              buttonContainer: [
                "bg-primary-container",
                "border-primary",
                "text-primary",
                "hover:border-primary-300",
                "hover:text-primary-300",
                "has-[button[data-disabled=true]]:border-primary-700",
                "has-[button[data-disabled=true]]:text-primary-700",
              ],
              buttonRipple: ["bg-primary-500/15"],
            },
          },
          //Outlined Error
          {
            variant: "outlined",
            severity: "error",
            class: {
              buttonContainer: [
                ...styleOutlinedError,
                "hover:border-error-400",
                "hover:text-error-400",
                "has-[button[data-disabled=true]]:border-error-800",
                "has-[button[data-disabled=true]]:text-error-800",
                "hover:has-[button[data-loading=true]]:border-error",
                "hover:has-[button[data-loading=true]]:text-error",
              ],
              buttonRipple: ["bg-error-500/15"],
            },
          },
          //Outlined Error Container
          {
            variant: "outlined",
            severity: "error-container",
            class: {
              buttonContainer: [
                "bg-error-container",
                "border-error",
                "text-error",
                "hover:border-error-300",
                "hover:text-error-300",
                "has-[button[data-disabled=true]]:border-error-800",
                "has-[button[data-disabled=true]]:text-error-800",
              ],
              buttonRipple: ["bg-error-500/15"],
            },
          },
          //Flatted Base
          {
            variant: "flatted",
            severity: "base",
            class: {
              buttonContainer: [
                ...styleFlattedBase,
                "hover:bg-black-base-300/15",
                "has-[button[data-disabled=true]]:text-black-base-900",
              ],
              buttonRipple: ["bg-black-base-500/15"],
            },
          },
          //Flatted Primary
          {
            variant: "flatted",
            severity: "primary",
            class: {
              buttonContainer: [
                ...styleFlattedPrimary,
                "hover:bg-primary-300/15",
                "has-[button[data-disabled=true]]:text-primary-900",
              ],
              buttonRipple: ["bg-primary-500/15"],
            },
          },
          //Flatted Primary Container
          {
            variant: "flatted",
            severity: "primary-container",
            class: {
              buttonContainer: [
                ...styleFlattedPrimaryContainer,
                "hover:bg-primary-container-300/15",
                "has-[button[data-disabled=true]]:text-primary-container-900",
              ],
              buttonRipple: ["bg-primary-container-500/15"],
            },
          },
          //Flatted Error
          {
            variant: "flatted",
            severity: "error",
            class: {
              buttonContainer: [
                ...styleFlattedError,
                "hover:bg-error-300/15",
                "has-[button[data-disabled=true]]:text-error-900",
              ],
              buttonRipple: ["bg-error-500/15"],
            },
          },
          //Flatted Error Container
          {
            variant: "flatted",
            severity: "error-container",
            class: {
              buttonContainer: [
                ...styleFlattedErrorContainer,
                "hover:bg-error-container-300/15",
                "has-[button[data-disabled=true]]:text-error-container-900",
              ],
              buttonRipple: ["bg-error-container-500/15"],
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
      styledBox.variants.variant.outlined,
    ]
  );

  return styledButton({ variant, severity, dense, size, elevation, rounded });
}
