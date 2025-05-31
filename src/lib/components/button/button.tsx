"use client";
import { useRef } from "react";
import { Center, Flex } from "../layout";
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
  onClick,
}: IButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const {
    buttonContainer,
    buttonAction,
    buttonRipple,
    buttonDisabled,
    buttonLoading,
  } = useStyledButton({
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

  return (
    <Flex
      tag="div"
      // tag={{
      //   component: StyledBox,
      //   props: { variant, severity, bordered, dense: true, elevation },
      // }}
      className={buttonContainer({ className })}
    >
      <Flex
        tag="button"
        ref={buttonRef}
        className={buttonAction()}
        data-loading={loading}
        data-disabled={disabled}
        align="center"
        justify="center"
        onClick={(e) => {
          if (onClick) {
            onClick(e);
          }
        }}
      >
        <>
          {icon}
          {children || (label && <T type="span">{label}</T>)}
          {rightIcon}
        </>
      </Flex>

      {loading && (
        <Center className={buttonLoading()}>
          <MltShdSpin />
        </Center>
      )}
      {disabled && <div className={buttonDisabled()}></div>}
    </Flex>
  );
}
