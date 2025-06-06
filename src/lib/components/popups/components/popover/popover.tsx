"use client";
import { useCallback, useImperativeHandle, useMemo, useRef } from "react";
import { IPopoverProps, IPopoverWrapperProps } from "./types";
import useParentTrigger from "../../hooks/useParentTrigger";
import { createPortal } from "react-dom";
import useStyledPopover from "./use-styled-popover";
import { twMerge } from "tailwind-merge";
import useOpen from "../../hooks/useOpen";
import useAnchor from "../../hooks/useAnchor";
import useClickOnWindow from "../../hooks/useClickOnWindow";
import useFill from "../../hooks/useFill";

export default function Popover({
  children,
  pivot,
  anchor,
  strategy,
  ref,
  open,
  triggerElement,
  canTriggerParent,
  overlay = false,
  fill = true,
  onClose,
}: IPopoverProps) {
  const [isOpen, setIsOpen] = useOpen({ open });
  const { anchorRef, targetRef, anchorPosition, anchorUpdater } = useAnchor({
    anchor,
    pivot,
    strategy,
  });

  const { filler } = useFill({ element: anchorRef, target: targetRef, fill });

  const {
    cl_container,
    cl_popover_empty_action,
    cl_overlay,
    cl_close_area,
    cl_content,
  } = useStyledPopover({ position: strategy });

  const popover_empty_action_ref = useRef<HTMLDivElement | null>(null);

  const openPopover = useCallback(
    function (e: MouseEvent) {
      e.stopPropagation();
      if (!isOpen) {
        setIsOpen(true);
        requestAnimationFrame(() => {
          filler();
          anchorUpdater();
          // TODO: Optimizar el comportamiento del popover
          // para que se muestre bien
          requestAnimationFrame(() => {
            if (anchorRef.current) {
              anchorRef.current.style.opacity = "1";
            }
          });
        });
      }
    },
    [anchorRef, anchorUpdater, filler, isOpen, setIsOpen]
  );

  const closePopover = useCallback(
    function (e: React.MouseEvent<HTMLElement> | MouseEvent) {
      e.stopPropagation();

      setIsOpen(false);

      if (onClose) {
        onClose();
      }
    },
    [onClose, setIsOpen]
  );

  /**
   * Hack para asignar al elemento padre un evento onCLick
   * para triguerear el modal sin tener que asignar un state
   * a open por defecto
   */
  const currentTriggerElement = useMemo(
    () =>
      triggerElement
        ? triggerElement
        : () => {
            return popover_empty_action_ref.current
              ? popover_empty_action_ref.current.parentElement
              : null;
          },
    [triggerElement]
  );
  useParentTrigger({
    canTriggerParent,
    triggerElement: currentTriggerElement,
    handler: openPopover,
    onParent: (ref) => {
      targetRef.current = ref.current as HTMLDivElement;
    },
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          setIsOpen(false);
        },
      };
    },
    [setIsOpen]
  );

  const PopoverContent = (
    <PopoverWrapper
      ref={anchorRef}
      className={cl_content({
        className: twMerge("popover-content", "opacity-0"),
      })}
      style={{
        top: anchorPosition.y,
        left: anchorPosition.x,
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onClickWindow={closePopover}
    >
      {children}
    </PopoverWrapper>
  );

  return (
    <div
      ref={popover_empty_action_ref}
      className={cl_popover_empty_action({ className: "popover-empty-action" })}
    >
      {isOpen &&
        createPortal(
          overlay ? (
            <div
              className={cl_container({
                className: twMerge("popover-container"),
              })}
            >
              <div
                className={cl_overlay({
                  className: "popover-overlay",
                })}
              >
                <div
                  className={cl_close_area({
                    className: "popover-close-area",
                  })}
                  onClick={(e) => closePopover(e)}
                >
                  {PopoverContent}
                </div>
              </div>
            </div>
          ) : (
            PopoverContent
          ),

          document.body
        )}
    </div>
  );
}

/**
 *
 * Wrapper del content del popover para que se limpie el evento de
 * click en el windows para cerrarlo
 *
 */
function PopoverWrapper({
  className,
  style,
  onClick,
  ref,
  children,
  onClickWindow,
  canClickWindow,
  ...domProps
}: IPopoverWrapperProps) {
  useClickOnWindow({ canClickWindow, onClickWindow });
  return (
    <div
      {...domProps}
      ref={ref}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
