import "./style/base.css";
import { ISeparatorProps } from "./types";

export default function Separator({ inset, ...domProps }: ISeparatorProps) {
  return (
    <hr
      {...domProps}
      className={`separator w-full ${inset ? "inset" : ""} ${
        domProps.className || ""
      }`}
    />
  );
}
