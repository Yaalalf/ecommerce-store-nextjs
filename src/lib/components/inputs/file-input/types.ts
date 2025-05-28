import { IClassName } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IFileInputProps extends Partial<IClassName> {
  label?: ReactNode;
  icon?: ReactNode;
  multiple?: boolean;
  apiUrl: string;
}
