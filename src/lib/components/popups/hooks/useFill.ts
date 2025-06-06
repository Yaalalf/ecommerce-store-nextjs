import { RefObject, useCallback } from "react";

export interface IUseFillProps {
  target: RefObject<HTMLElement | null>;
  element: RefObject<HTMLElement | null>;
  fill: boolean;
}

export default function useFill({ element, target, fill }: IUseFillProps): {
  filler: () => void;
} {
  const filler = useCallback(() => {
    if (fill) {
      if (element.current && target.current) {
        const targetWidth = target.current.getBoundingClientRect().width;
        element.current.style.width = targetWidth + "px";
      }
    }
  }, [element, fill, target]);

  return { filler };
}
