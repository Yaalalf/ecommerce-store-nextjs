"use client";
import { AnimatePresence, motion } from "motion/react";
import {
  memo,
  RefObject,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { IPopoverProps, IPopoverWrapperProps } from "./types";
import useParentTrigger from "../../hooks/useParentTrigger";
import { createPortal } from "react-dom";
import useStyledPopover from "./use-styled-popover";
import { twMerge } from "tailwind-merge";
import useOpen from "../../hooks/useOpen";
import useAnchor, { IAnchorMiddleware } from "../../hooks/useAnchor";
import useClickOnWindow from "../../hooks/useClickOnWindow";
import useFill from "../../hooks/useFill";
import useIsMounted from "../../hooks/useMounted";

const Popover = memo(function Popover({
  children,
  pivot,
  anchor,
  strategy,
  offset,
  ref,
  open,
  triggerElement,
  canTriggerParent,
  overlay = false,
  fill = true,
  onClose,
}: IPopoverProps) {
  const anchorMiddlewares: IAnchorMiddleware[] = [];

  if (offset) {
    anchorMiddlewares.push({
      props: { rect: { x: offset[0], y: offset[1], width: 0, height: 0 } },
      exec: ({ previousPoint, rect }) => {
        return { x: previousPoint.x + rect.x, y: previousPoint.y + rect.y };
      },
    });
  }

  const [isOpen, setIsOpen] = useOpen({ open });
  const isMounted = useIsMounted();
  const { anchorRef, targetRef, anchorPosition, anchorUpdater } = useAnchor({
    anchor,
    pivot,
    strategy,
    middleware: anchorMiddlewares,
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
        });
      }
    },
    [anchorUpdater, filler, isOpen, setIsOpen]
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

  const selectParentElement = useCallback(
    () =>
      popover_empty_action_ref.current
        ? popover_empty_action_ref.current.parentElement
        : null,
    []
  );

  const currentTriggerElement = useMemo(
    () => (triggerElement ? triggerElement : selectParentElement),
    [selectParentElement, triggerElement]
  );

  const onParentHandler = useCallback(
    (ref: RefObject<HTMLElement | null>) => {
      targetRef.current = ref.current as HTMLDivElement;
    },
    [targetRef]
  );

  useParentTrigger({
    canTriggerParent,
    triggerElement: currentTriggerElement,
    handler: openPopover,
    onParent: onParentHandler,
  });

  useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          setIsOpen(false);
          if (onClose) {
            onClose();
          }
        },
      };
    },
    [onClose, setIsOpen]
  );

  const PopoverContent = (
    <PopoverWrapper
      ref={anchorRef}
      className={cl_content({
        className: twMerge("popover-content"),
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
    <>
      {!triggerElement && (
        <div
          ref={popover_empty_action_ref}
          className={cl_popover_empty_action({
            className: "popover-empty-action",
          })}
        ></div>
      )}

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen &&
              (overlay ? (
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
              ))}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
});

/**
 *
 * Wrapper del content del popover para que se limpie el evento de
 * click en el windows para cerrarlo
 *
 */
const PopoverWrapper = memo(function PopoverWrapper({
  className,
  style,
  onClick,
  ref,
  children,
  onClickWindow,
  canClickWindow,
}: // ...domProps
IPopoverWrapperProps) {
  useClickOnWindow({ canClickWindow, onClickWindow });
  return (
    <motion.div
      // {...domProps}
      ref={ref}
      key={"popover"}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
});

export default Popover;
