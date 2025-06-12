import { IClassName } from "@/lib/types/components-props";
import { ReactNode } from "react";

export interface IAutocompleteMultipleProps<T> extends IAutocompleteProps<T> {
  multiple: true;
  value: T[];
}

export interface IAutocompleteSingleProps<T> extends IAutocompleteProps<T> {
  multiple: false;
  value: T;
}

export interface IAutocompleteProps<T> extends Partial<IClassName> {
  suggestions: T[];
  field?: keyof T;
  onSuggest?: (item: T, index?: number) => void;
  onDeleteSuggest?: (item: T, index?: number) => void;
  suggestedItemsSlots?: (suggestion: T) => ReactNode;
}
