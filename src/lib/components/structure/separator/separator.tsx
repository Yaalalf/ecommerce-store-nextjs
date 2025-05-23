import { ISeparatorProps } from "./types";

export default function Separator({ inset, ...domProps }: ISeparatorProps) {
  return (
    <div
      {...domProps}
      className={`separator ${inset ? "px-4" : ""} ${domProps.className || ""}`}
    >
      <hr className={`separator-line w-full  `} />
    </div>
  );
}
