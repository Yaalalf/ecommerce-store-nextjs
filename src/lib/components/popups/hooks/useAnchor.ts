import { useCallback, useRef, useState } from "react";
import { computePosition } from "../utils/computePosition";
import { EStrategy, PivotPosition, Strategy } from "../types/utility";

export interface IUseAnchorProps {
  pivot: PivotPosition;
  anchor: PivotPosition;
  strategy: Strategy;
}

export default function useAnchor({
  anchor,
  pivot,
  strategy = EStrategy.FIXED,
}: Partial<IUseAnchorProps>) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const anchorRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line prefer-const
  let targetRef = useRef<HTMLDivElement | null>(null);

  const anchorUpdater = useCallback(() => {
    if (targetRef.current && anchorRef.current) {
      const { x, y } = computePosition({
        targetElement: targetRef.current,
        anchorElement: anchorRef.current,
        options: {
          anchor,
          pivot,
          strategy,
        },
      });
      setPosition({
        y,
        x,
      });
    }
  }, [anchor, pivot, strategy]);

  return {
    anchorRef,
    targetRef,

    anchorPosition: position,
    anchorUpdater,
  };
}
