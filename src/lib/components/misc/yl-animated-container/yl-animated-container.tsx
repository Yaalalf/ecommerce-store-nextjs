"use client";

import "./base.css";
import { CSSProperties, ReactNode } from "react";

export default function YLAnimatedContainer({
  state,
  children,
  className,
  animationInit = "slideInSmall",
  animationPending = "scalePending",
  animationEnd = "slideOutSmall",
  delay = 0,
}: {
  state: string;
  children: ReactNode;
  className?: string;
  animationInit?: string;
  animationPending?: string;
  animationEnd?: string;
  delay?: number;
}) {
  return (
    <div
      className={`yl-animation-container   ${className || ""}  ${
        state !== "pending" ? (state == "init" ? "init" : "end") : "pending"
      }`}
      style={
        {
          animationDelay: delay + "ms",
          "--animation-init-name": animationInit,
          "--animation-pending-name": animationPending,
          "--animation-end-name": animationEnd,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
