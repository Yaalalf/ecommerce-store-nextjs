import { CSSProperties } from "react";
import "./base.css";

export default function MaskedSVG({
  src,

  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <span className={`masked_svg ${className}`}>
      <span
        className="masked_svg_container"
        style={
          {
            "--mask-image-url": `url("${src}")`,
          } as CSSProperties
        }
      ></span>
    </span>
  );
}
