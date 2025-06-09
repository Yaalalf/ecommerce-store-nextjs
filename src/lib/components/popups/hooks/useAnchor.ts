import { RefObject, useCallback, useRef, useState } from "react";
import { computePosition } from "../utils/computePosition";
import {
  EStrategy,
  IPoint,
  IRect,
  PivotPosition,
  Strategy,
} from "../types/utility";

export interface IAnchorMiddlewareProps {
  previousPoint: IPoint;
  rect: IRect;
}
export interface IAnchorMiddleware {
  props: Omit<IAnchorMiddlewareProps, "previousPoint">;
  exec: ({ previousPoint, rect }: IAnchorMiddlewareProps) => IPoint;
}

export interface IUseAnchorProps {
  targetElement: RefObject<HTMLElement | null>;
  pivot: PivotPosition;
  anchor: PivotPosition;
  strategy: Strategy;
  middleware: IAnchorMiddleware[];
}

export default function useAnchor({
  targetElement,
  anchor,
  pivot,
  strategy = EStrategy.ABSOLUTE,
  middleware = [],
}: Partial<IUseAnchorProps>) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const anchorRef = useRef<HTMLDivElement | null>(null);

  let targetRef = useRef<HTMLElement | null>(null);

  if (targetElement) {
    targetRef = targetElement;
  }

  const anchorUpdater = useCallback(() => {
    if (targetRef.current && anchorRef.current) {
      const { x, y } = computePosition({
        targetElement: targetRef.current,
        anchorElement: anchorRef.current,
        options: {
          anchor,
          pivot,
          strategy,
          middleware,
        },
      });
      if (position.x != x || position.y != y) {
        setPosition({
          y,
          x,
        });
      }
    }
  }, [anchor, middleware, pivot, position.x, position.y, strategy]);

  return {
    anchorRef,
    targetRef,

    anchorPosition: position,
    anchorUpdater,
  };
}
