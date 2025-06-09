"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { IDialog, IDialogProps } from "./types";
import useStyledDialog from "./use-styled-dialog";
import { twMerge } from "tailwind-merge";
import useParentTrigger from "../../hooks/useParentTrigger";
import useOpen from "../../hooks/useOpen";
import useIsMounted from "../../hooks/useMounted";
import { AnimatePresence, motion } from "motion/react";

export default function Dialog({
  children,
  ref,
  triggerElement,

  open = false,

  position = "center",
  canTriggerParent = false,
  pt,

  onClose,
}: IDialogProps) {
  const {
    cl_container,
    cl_dialog_empty_action,
    cl_overlay,
    cl_close_area,
    cl_content,
  } = useStyledDialog({ position });

  const [isOpen, setIsOpen] = useOpen({ open });
  const isMounted = useIsMounted();
  const dialog_empty_action_ref = useRef<HTMLDivElement | null>(null);

  /**
   * Hack para desactivar el scroll del body en caso de haber un dialog
   */
  useEffect(() => {
    //Style to hidden the body scroll
    window.document.body.classList.add(
      "has-[.dialog-container]:overflow-hidden"
    );
  }, []);

  /**
   * Hack para asignar al elemento padre un evento onCLick
   * para triguerear el modal sin tener que asignar un state
   * a open por defecto
   */
  useParentTrigger({
    canTriggerParent,
    triggerElement: triggerElement
      ? triggerElement
      : () => {
          return dialog_empty_action_ref.current
            ? dialog_empty_action_ref.current.parentElement
            : null;
        },
    handler: onClickDialog,
  });

  useImperativeHandle(
    ref,
    (): IDialog => {
      return {
        close() {
          setIsOpen(false);
        },
      };
    },
    [setIsOpen]
  );

  return (
    <div
      ref={dialog_empty_action_ref}
      className={cl_dialog_empty_action({ className: "dialog-empty-action" })}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {isMounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key={"dialog"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cl_container({
                  className: twMerge(
                    "dialog-container",
                    pt?.container?.className
                  ),
                })}
              >
                <div
                  {...pt?.overlay}
                  className={cl_overlay({
                    className: twMerge(
                      "dialog-overlay",
                      pt?.overlay?.className
                    ),
                  })}
                >
                  <div
                    {...pt?.close_area}
                    className={cl_close_area({
                      className: twMerge(
                        "dialog-close-area",
                        pt?.close_area?.className
                      ),
                    })}
                    onClick={
                      pt?.close_area?.onClick || ((e) => onCloseDialog(e))
                    }
                  ></div>
                  <div
                    {...pt?.content}
                    className={cl_content({
                      className: twMerge(
                        "dialog-content",
                        pt?.content?.className
                      ),
                    })}
                  >
                    {children}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );

  function onClickDialog(e: MouseEvent) {
    e.stopPropagation();
    setIsOpen(true);
  }

  function onCloseDialog(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    setIsOpen(false);

    if (onClose) {
      onClose();
    }
  }
}
