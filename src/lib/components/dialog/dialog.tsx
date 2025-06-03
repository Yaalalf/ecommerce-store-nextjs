"use client";

import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IDialogProps } from "./types";
import useStyledDialog from "./use-styled-dialog";
import { twMerge } from "tailwind-merge";

export default function Dialog({
  children,
  ref,
  parentElement,

  open = false,

  position = "center",
  triggerParent = false,
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

  const [isOpen, setIsOpen] = useState(open);

  const dialog_empty_action_ref = useRef<HTMLDivElement | null>(null);

  let parentElementRef: HTMLElement;

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
   * Cambiar el estado del componente si open es cambiado
   * desde afuera
   */
  useEffect(() => {
    setIsOpen(open);
  }, [open]);
  /**
   * Hack para asignar al elemento padre un evento onCLick
   * para triguerear el modal sin tener que asignar un state
   * a open por defecto
   */
  useEffect(() => {
    if (triggerParent) {
      if (parentElement) {
        if (parentElement.current) {
          if (parentElement.current instanceof HTMLElement) {
            parentElementRef = parentElement.current;
          } else {
            parentElementRef = parentElement.current.ref;
          }
          parentElementRef.addEventListener("click", onClickDialog);
        }
      } else {
        if (dialog_empty_action_ref.current) {
          if (dialog_empty_action_ref.current.parentElement) {
            parentElementRef = dialog_empty_action_ref.current.parentElement;

            parentElementRef.addEventListener("click", onClickDialog);
          }
        }
      }
    }
  }, [parentElement, dialog_empty_action_ref, triggerParent]);

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

  return (
    <div
      ref={dialog_empty_action_ref}
      className={cl_dialog_empty_action({ className: "dialog-empty-action" })}
    >
      {isOpen &&
        createPortal(
          <div
            {...pt?.container}
            className={cl_container({
              className: twMerge("dialog-container", pt?.container?.className),
            })}
            key={"dialog"}
          >
            <div
              {...pt?.overlay}
              className={cl_overlay({
                className: twMerge("dialog-overlay", pt?.overlay?.className),
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
                onClick={pt?.close_area?.onClick || ((e) => onCloseDialog(e))}
              ></div>
              <div
                {...pt?.content}
                className={cl_content({
                  className: twMerge("dialog-content", pt?.content?.className),
                })}
              >
                {children}
              </div>
            </div>
          </div>,
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
