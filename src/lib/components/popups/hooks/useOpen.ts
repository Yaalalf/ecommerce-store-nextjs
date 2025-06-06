import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface IUseOpenProps {
  open: boolean;
}

export default function useOpen({
  open = false,
}: Partial<IUseOpenProps>): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [isOpen, setIsOpen] = useState(open);

  /**
   * Cambiar el estado del componente si open es cambiado
   * desde afuera
   */
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  return [isOpen, setIsOpen];
}
