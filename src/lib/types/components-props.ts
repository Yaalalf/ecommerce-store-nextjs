import { HTMLAttributes, ReactNode } from "react";
import {
  AlignItems,
  FlexDirection,
  FlexWrap,
  Gap,
  JustifyContent,
  TextAlign,
  TextVariant,
} from "./css";

export interface IChildren {
  children: ReactNode;
}
export interface IClassName {
  className: string;
}

export interface ITagNode<T extends IPTNode> {
  tag:
    | ((props: T) => ReactNode)
    | { component: (props: T) => ReactNode; props: T }
    | Tag;
}

export interface ITag {
  tag: ElementTag | ListTag | TextTag;
}

export interface IElementTag {
  tag: Tag;
}
export interface IListTag {
  tag: ListTag;
}
export type Tag = ElementTag | ListTag | TextTag;
export type ElementTag = "div" | "article" | "section" | "main";
export type ListTag = "ul" | "ol";
export type TextTag = "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface IDirection {
  direction: FlexDirection;
}
export interface IWrap {
  wrap: FlexWrap;
}
export interface IReverse {
  reverse: boolean;
}
export interface IJustifyContent {
  justify: JustifyContent;
}
export interface IAlignItems {
  align: AlignItems;
}

export interface IGapProp {
  gap: Gap;
}
export interface IPTProp<T> {
  pt: T;
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

export interface ITextVariantProp {
  textVariant: TextVariant;
}
export interface ITextAlignProp {
  textAlign: TextAlign;
}
