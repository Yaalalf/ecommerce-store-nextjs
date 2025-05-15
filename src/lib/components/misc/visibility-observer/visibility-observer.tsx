"use client";

import { useEffect, useRef } from "react";

export default function VisibilityObserver({
  onVisibility,
  className,
  once = false,
}: {
  onVisibility: (entry: IntersectionObserverEntry) => void;
  className?: string;
  once?: boolean;
}) {
  const visibilityObserverRef = useRef(null);

  useEffect(() => {
    if (visibilityObserverRef.current) {
      const nodeRef = visibilityObserverRef.current;

      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          onVisibility(entries[0]);
          if (entries[0].isIntersecting && once) {
            intersectionObserver.unobserve(nodeRef);
            intersectionObserver.disconnect();
          }
        },
        { threshold: [1] }
      );
      intersectionObserver.observe(nodeRef);

      return () => {
        if (nodeRef) {
          intersectionObserver.unobserve(nodeRef);
          intersectionObserver.disconnect();
        }
      };
    }
  }, [onVisibility, once]);

  return (
    <div
      ref={visibilityObserverRef}
      className={`VisibilityObserver ${className || ""}`}
    ></div>
  );
}
