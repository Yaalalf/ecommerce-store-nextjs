import React, { HTMLAttributes } from "react";
import { AlignItems, FlexDirection, Gap, JustifyContent } from "./css";

export interface IChildren {
  children: React.ReactNode;
}
export interface IClassName {
  className: string;
}

export interface ITag {
  tag: ElementTag | ListTag;
}

export interface IElementTag {
  tag: ElementTag;
}
export interface IListTag {
  tag: ListTag;
}

export type ElementTag = "div" | "article" | "section" | "main";
export type ListTag = "ul" | "ol";

export interface IDirection {
  direction: FlexDirection;
}
export interface IJustifyContent {
  justify: JustifyContent;
}
export interface IAlignItems {
  align: AlignItems;
}

export interface IGap {
  gap: Gap;
}

export interface IPTNode
  extends HTMLAttributes<HTMLElement>,
    Partial<IClassName> {}

export interface ITextProp {
  text: string;
}
export interface ITypeProp<T> {
  type: T;
}
