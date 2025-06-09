import { IClassName } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IAutocompleteProps<T> extends Partial<IClassName> {
  value: string;
  suggestions: T[];
  field?: keyof T;
  onChange: (value: string) => void;
  onSuggest?: (item: T, index: number) => boolean;
  suggestedItemsSlots?: (suggestion: T) => ReactNode;
}
