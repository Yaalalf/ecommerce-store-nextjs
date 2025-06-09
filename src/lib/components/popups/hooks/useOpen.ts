import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export interface IUseOpenProps {
  open: boolean;
}

export default function useOpen({
  open = false,
}: Partial<IUseOpenProps>): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isOpen, setIsOpen] = useState(open);
  const previousIsOpen = useRef(open);
  /**
   * Cambiar el estado del componente si open es cambiado
   * desde afuera
   */

  useEffect(() => {
    if (open !== previousIsOpen.current) {
      setIsOpen(open);
      previousIsOpen.current = open;
    }
  }, [open]);

  return [isOpen, setIsOpen];
}
