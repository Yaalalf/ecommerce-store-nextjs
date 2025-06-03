import { twMerge } from "tailwind-merge";
import useStyledInput from "../input/use-styled-input";
import { ITextareaProps } from "./types";

export default function Textarea({
  className,

  value,
  onValueChange,

  variant,
  severity = "primary",
  dense = true,
  elevation,
  rounded,
  bordered,

  ...domProps
}: ITextareaProps) {
  const { inputContainer } = useStyledInput({
    variant,
    severity,
    dense,
    elevation,
    rounded,
    bordered,
  });

  return (
    <textarea
      rows={1}
      {...domProps}
      className={inputContainer({
        className: twMerge(
          " h-auto min-h-[240px] overflow-visible resize-none",
          className
        ),
      })}
      value={value}
      onChange={(e) => {
        onValueChange(e.target.value);
      }}
    ></textarea>
  );
}
