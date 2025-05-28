import { clsx } from "clsx";
import "./base.css";

export default function MltShdSpin({ className }: { className?: string }) {
  const spinClassName = clsx("mlt-shd-spin", className);

  return <span className={spinClassName}></span>;
}
