import { useCallback, useEffect } from "react";

export interface IUseClickOnWindowProps {
  canClickWindow?: boolean;
  onClickWindow: (e: MouseEvent) => void;
}

export default function useClickOnWindow({
  canClickWindow = true,
  onClickWindow,
}: IUseClickOnWindowProps) {
  const clickWindow = useCallback(onClickWindow, [onClickWindow]);

  useEffect(() => {
    if (canClickWindow) {
      window.addEventListener("click", clickWindow);

      return () => {
        window.removeEventListener("click", clickWindow);
      };
    }
  }, [canClickWindow, clickWindow]);
}
