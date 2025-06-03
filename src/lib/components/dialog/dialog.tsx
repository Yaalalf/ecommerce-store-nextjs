"use client";

import "./base.css";

import {
  forwardRef,
  ReactNode,
  RefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";

export default forwardRef(function YLDialog(
  {
    className,
    children,
    parentElement,

    value,
    setValue,
  }: // onChange,
  {
    className?: string;
    parentElement?: RefObject<HTMLElement | { ref: HTMLElement } | null>;
    children?: ReactNode;

    onChange?: (value: boolean) => void;
    value: boolean;
    setValue: (value: boolean) => void;
  },
  ref
) {
  // const [isDialog, setIsDialog] = useState(visible);

  const currentBoundingRect = useRef({ x: 0, y: 0 });

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const dialogContainerRef = useRef<HTMLDivElement | null>(null);

  let parentElementRef: HTMLElement;

  useEffect(() => {
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
      if (dialogRef.current) {
        if (dialogRef.current.parentElement) {
          parentElementRef = dialogRef.current.parentElement;

          parentElementRef.addEventListener("click", onClickDialog);
        }
      }
    }
  }, [parentElement, dialogRef]);

  useImperativeHandle(
    ref,
    () => {
      return {
        close() {
          setValue(false);
        },
      };
    },
    [setValue]
  );

  return (
    <div ref={dialogRef} className="yl-dialog">
      {value &&
        createPortal(
          <div className="yl-dialog-dialog-container">
            <div className="yl-dialog-container-background">
              <div
                className="yl-dialog-container-close-area"
                onClick={(e) => onCloseDialog(e)}
              ></div>
              <div
                ref={dialogContainerRef}
                className={`yl-dialog-container-content ${className || " "}`}
                style={{
                  top: currentBoundingRect.current.y,
                  left: currentBoundingRect.current.x,
                }}
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
    setValue(true);
  }

  function onCloseDialog(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();

    setValue(false);
  }
});
