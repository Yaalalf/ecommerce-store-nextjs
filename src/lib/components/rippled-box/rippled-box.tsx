"use client";
import { useRef } from "react";
import useRipple from "../hooks/use-ripple";
import { IRippledBoxProps } from "./types";
import { twMerge } from "tailwind-merge";

export default function RippledBox({ children, pt }: IRippledBoxProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useRipple({
    rippleTrigger: containerRef,
    options: { className: pt?.ripple?.className },
  });

  return (
    <div
      {...pt?.root}
      ref={containerRef}
      className={twMerge(
        "rippled-box",
        "relative",
        "overflow-hidden",
        pt?.root?.className
      )}
    >
      {children}
    </div>
  );
}
