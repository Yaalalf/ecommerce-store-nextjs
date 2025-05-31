import { RefObject, useCallback, useEffect } from "react";

export default function useRipple<T extends HTMLElement>({
  rippleTrigger,
  rippleHandler = rippleTrigger,
  options = {},
}: {
  rippleTrigger: RefObject<T | null>;
  rippleHandler?: RefObject<T | null>;
  options?: { color?: string; className?: string };
}) {
  const ripple = useCallback(
    function (e: MouseEvent) {
      if (rippleHandler.current) {
        const { height, width, x, y } =
          rippleHandler.current.getBoundingClientRect();

        const posX = x;
        const posY = y;
        let buttonWidth = width;
        let buttonHeight = height;

        // Add the element
        const ripple = document.createElement("span");

        rippleHandler.current.appendChild(ripple);

        // Make it round!
        if (buttonWidth >= buttonHeight) {
          buttonHeight = buttonWidth;
        } else {
          buttonWidth = buttonHeight;
        }

        // Get the center of the element
        const rippleX = e.clientX - posX - buttonWidth / 2;
        const rippleY = e.clientY - posY - buttonHeight / 2;

        ripple.style.width = `${buttonWidth}px`;
        ripple.style.height = `${buttonHeight}px`;
        ripple.style.top = `${rippleY}px`;
        ripple.style.left = `${rippleX}px`;

        ripple.classList.add("yl-ripple");
        if (options.color) {
          ripple.style.backgroundColor = options.color;
        }
        if (options.className) {
          ripple.classList.add(options.className);
        }
        if (!options.color && !options.className) {
          ripple.style.backgroundColor = "#ffffff4a";
        }
        ripple.classList.add("yl-ripple-animation");

        setTimeout(() => {
          if (rippleHandler.current) {
            rippleHandler.current.removeChild(ripple);
          }
        }, 1000);
      }
    },
    [options.className, options.color, rippleHandler]
  );

  useEffect(() => {
    if (rippleTrigger.current) {
      rippleTrigger.current.addEventListener("click", ripple);

      const currentTrigger = rippleTrigger.current;
      return () => {
        currentTrigger.removeEventListener("click", ripple);
      };
    }
  }, [rippleTrigger, ripple]);
}
