import "./style/base.css";

import { Fragment } from "react";
import Flex from "../../layout/flex";
import { IListProps } from "./types";
import { assignKey } from "@/lib/utils/list_utility";

export default function List<T, N extends string>({
  className = "",
  tag = "ul",
  direction,
  align,
  justify,
  gap,
  wrap,
  data,
  propKey,
  children,
  unwrap,
  slotItems,
  pt,
}: IListProps<T>) {
  const UnwrapComponent = unwrap ? Fragment : "li";

  function runItem(item: T, index: number) {
    const key = assignKey({ propKey: propKey, item, index }) as N;

    const ptItemSpecifics =
      pt?.items?.[key] != undefined ? { ...pt.items[key] } : undefined;
    const slotItemSpecifics =
      slotItems?.[key] != undefined ? slotItems?.[key] : undefined;

    return (
      <UnwrapComponent
        {...(!unwrap
          ? {
              ...{ ...pt?.item },
              ...ptItemSpecifics,
              className: `${pt?.item?.className || ""} ${
                ptItemSpecifics?.className || ""
              } list_items`,
            }
          : undefined)}
        key={key}
      >
        {slotItemSpecifics
          ? slotItemSpecifics(item, index)
          : children(item, index)}
      </UnwrapComponent>
    );
  }

  return (
    <Flex
      {...pt?.root}
      {...{ direction, tag, gap, align, justify, wrap }}
      className={`${className} list`}
    >
      {data.map(runItem)}
    </Flex>
  );
}
