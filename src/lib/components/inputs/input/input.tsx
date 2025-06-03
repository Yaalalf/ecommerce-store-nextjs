import { twMerge } from "tailwind-merge";
import { Beside } from "../../structure";
import { IInputProps } from "./types";
import useStyledInput from "./use-styled-input";

export default function Input({
  className,

  value,
  onValueChange,
  type = "text",
  variant,
  severity = "primary",
  dense = true,
  elevation,
  rounded,
  bordered,

  slotAfter,
  slotBefore,
  slotAppend,
  slotPrepend,
  ...domProps
}: IInputProps) {
  const { inputContainer, inputNative } = useStyledInput({
    variant,
    severity,
    dense,
    elevation,
    rounded,
    bordered,
  });

  return (
    <Beside
      className="gap-1 w-full"
      tag="label"
      slotAfter={slotAfter}
      slotBefore={slotBefore}
    >
      <Beside
        className={inputContainer({ className: twMerge("gap-1", className) })}
        slotAfter={slotAppend}
        slotBefore={slotPrepend}
      >
        <input
          {...domProps}
          className={inputNative()}
          value={value}
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
          type={type}
        />
      </Beside>
    </Beside>
  );
}
