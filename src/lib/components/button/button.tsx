"use client";
import { useImperativeHandle, useRef } from "react";
import { Center } from "../layout";
import { T } from "../text";
import { IButtonProps } from "./types";
import useRipple from "../hooks/use-ripple";
import MltShdSpin from "../spinners/mlt-shd-spin";
import useStyledButton from "./use-styled-button";

export default function Button({
  label,
  children,
  icon,
  rightIcon,
  disabled,
  loading,
  variant,
  severity,
  bordered,
  dense,
  size,
  elevation,
  rounded,
  className,
  ref,
  ...domProps
}: IButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { buttonContainer, buttonRipple, buttonLoading } = useStyledButton({
    dense,
    variant,
    severity,
    bordered,
    elevation,
    size,
    rounded,
  });

  useRipple({
    rippleTrigger: buttonRef,
    options: { className: buttonRipple() },
  });

  useImperativeHandle(
    ref,
    () => {
      return buttonRef.current as HTMLButtonElement;
    },
    []
  );
  return (
    <button
      {...domProps}
      ref={buttonRef}
      className={buttonContainer({ className: className })}
      data-loading={loading}
      data-disabled={disabled}
      disabled={disabled || loading}
    >
      {icon}
      {children || (label && <T type="span">{label}</T>)}
      {rightIcon}
      {loading && (
        <Center className={buttonLoading()}>
          <MltShdSpin />
        </Center>
      )}
    </button>
  );
}
