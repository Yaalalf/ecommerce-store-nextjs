import { ElementType } from "react";
import { IPTNode, ITagNode } from "../types/components-props";

export function handleTagProp<T extends IPTNode>({
  tag,
}: ITagNode<T>): { component: ElementType; props?: T } {
  let component: { component: ElementType; props?: T };

  if (typeof tag === "string" || typeof tag === "function") {
    component = { component: tag };
  } else {
    component = tag;
  }

  return component;
}
