"use client";
import { useRef } from "react";
import { Center, Flex } from "../layout";
import { T } from "../text";
import { IButtonProps } from "./types";
import { StyledBox } from "../structure";
import { clsx } from "clsx";
import useRipple from "../hooks/use-ripple";
import MltShdSpin from "../spinners/mlt-shd-spin";

export default function Button({
  label,
  children,
  icon,
  rightIcon,
  disabled,
  loading,
  variant = "surface",
  severity = "base",
  bordered,
  dense,
  elevation,
  className,
  onClick,
}: IButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  useRipple({ rippleTrigger: buttonRef });

  const variantSurfaceBaseClassName = {
    buttonContainer: clsx("hover:bg-base-500"),
    buttonLoading: "",
  };
  const variantSurfacePrimaryClassName = {
    buttonContainer: clsx("hover:bg-primary-400"),
    buttonLoading: clsx("bg-primary"),
  };
  const variantSurfaceErrorContainerClassName = {
    buttonContainer: clsx(""),
    buttonLoading: clsx("bg-error-container"),
  };
  const variantSurfaceSeverityClassName = {
    base: variantSurfaceBaseClassName,
    primary: variantSurfacePrimaryClassName,
    "primary-container": { buttonContainer: "", buttonLoading: "" },
    error: { buttonContainer: "", buttonLoading: "" },
    "error-container": variantSurfaceErrorContainerClassName,
  };
  const variantsClassName = {
    surface: variantSurfaceSeverityClassName,
    outlined: {
      base: { buttonContainer: "", buttonLoading: "" },
      primary: { buttonContainer: "", buttonLoading: "" },
      "primary-container": { buttonContainer: "", buttonLoading: "" },
      error: { buttonContainer: "", buttonLoading: "" },
      "error-container": { buttonContainer: "", buttonLoading: "" },
    },
    flatted: {
      base: { buttonContainer: "", buttonLoading: "" },
      primary: { buttonContainer: "", buttonLoading: "" },
      "primary-container": { buttonContainer: "", buttonLoading: "" },
      error: { buttonContainer: "", buttonLoading: "" },
      "error-container": { buttonContainer: "", buttonLoading: "" },
    },
    elevated: {
      base: { buttonContainer: "", buttonLoading: "" },
      primary: { buttonContainer: "", buttonLoading: "" },
      "primary-container": { buttonContainer: "", buttonLoading: "" },
      error: { buttonContainer: "", buttonLoading: "" },
      "error-container": { buttonContainer: "", buttonLoading: "" },
    },
    ghost: {
      base: { buttonContainer: "", buttonLoading: "" },
      primary: { buttonContainer: "", buttonLoading: "" },
      "primary-container": { buttonContainer: "", buttonLoading: "" },
      error: { buttonContainer: "", buttonLoading: "" },
      "error-container": { buttonContainer: "", buttonLoading: "" },
    },
    "outlined-ghost": {
      base: { buttonContainer: "", buttonLoading: "" },
      primary: { buttonContainer: "", buttonLoading: "" },
      "primary-container": { buttonContainer: "", buttonLoading: "" },
      error: { buttonContainer: "", buttonLoading: "" },
      "error-container": { buttonContainer: "", buttonLoading: "" },
    },
  };

  const buttonContainerClassName = clsx(
    "transition-[scale,background] duration-150 has-[.button-action:active]:scale-[0.98] text-sm relative overflow-hidden",
    variantsClassName[variant][severity].buttonContainer,
    className
  );
  const buttonClassName = clsx(
    "button-action",
    "hover:cursor-pointer relative  gap-1",
    dense ? "py-2 px-2" : "px-4 py-2"
  );

  const loadingClassName = clsx(
    "button-loading",
    "absolute top-0 left-0 w-full h-full ",
    variantsClassName[variant][severity].buttonLoading
  );

  return (
    <Flex
      tag={{
        component: StyledBox,
        props: { variant, severity, bordered, dense: true, elevation },
      }}
      className={buttonContainerClassName}
    >
      <Flex
        tag="button"
        ref={buttonRef}
        className={buttonClassName}
        align="center"
        justify="center"
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
      >
        {icon}
        <T type="span">{children || label}</T>
        {rightIcon}
      </Flex>

      {loading && (
        <Center className={loadingClassName}>
          <MltShdSpin />
        </Center>
      )}
      {disabled && <div className="button-disabled-foreground"></div>}
    </Flex>
  );
}
