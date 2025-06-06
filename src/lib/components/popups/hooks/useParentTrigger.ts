import { RefObject, useEffect, useRef } from "react";

/**
 * Hack para asignar al elemento padre un evento onCLick
 * para triguerear el modal sin tener que asignar un state
 * a open por defecto
 */

export interface IParentTriggerProps extends Partial<IParentTriggerEvents> {
  /**
   * Si se activa al elemento seleccionado se le asigna
   * un evento onclick para que ejecute el handler
   */
  canTriggerParent?: boolean;
  triggerElement:
    | RefObject<HTMLElement | { ref: HTMLElement } | null>
    | (() => HTMLElement | null);
  handler: (e: MouseEvent) => void;
}
/**
 * Eventos para lanzar callBack en determinados momentos de la operacion
 */
export interface IParentTriggerEvents {
  /**
   * Una vez que se tiene la referencia al padre realizar mas
   * operaciones con ella
   *
   */
  onParent: (ref: RefObject<HTMLElement | null>) => void;
}

export default function useParentTrigger({
  canTriggerParent,
  triggerElement,
  handler,
  onParent,
}: IParentTriggerProps) {
  const parentElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (canTriggerParent) {
      if (typeof triggerElement === "function") {
        const element = triggerElement();
        if (element != null) {
          parentElementRef.current = element;
        }
      } else if (triggerElement.current) {
        if (triggerElement.current instanceof HTMLElement) {
          parentElementRef.current = triggerElement.current;
        } else {
          parentElementRef.current = triggerElement.current.ref;
        }
      }
      if (parentElementRef.current && handler) {
        parentElementRef.current.addEventListener("click", handler);
      }
    }

    if (onParent) {
      onParent(parentElementRef);
    }

    return () => {
      parentElementRef.current?.removeEventListener("click", handler);
    };
  }, [triggerElement, canTriggerParent, handler, onParent]);

  return parentElementRef;
}
