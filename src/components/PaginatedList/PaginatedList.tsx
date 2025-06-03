"use client";
import { Column, List } from "@/lib/components";
import Pagination from "@/lib/components/pagination";

import { clsx } from "clsx";
import { useState } from "react";
import { IPaginatedList } from "./types";

export default function PaginatedList<T>({
  data,
  className,
  children,
  direction = "column",
  pageSize = 9,
  ...restProps
}: IPaginatedList<T>) {
  const paginationLength = Math.ceil(data.length / pageSize);

  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const paginatedListClassName = clsx(
    "paginated-list",
    "px-4 gap-2 w-full",
    className
  );

  const paginatedData = data.slice(
    (currentPageIndex - 1) * pageSize,
    (currentPageIndex - 1) * pageSize + pageSize
  );

  return (
    <Column className="gap-4 items-center">
      <List
        {...restProps}
        className={paginatedListClassName}
        data={paginatedData}
        direction={direction}
      >
        {children}
      </List>
      <Pagination
        pagesLength={paginationLength}
        onChange={(index) => {
          setCurrentPageIndex(index);
        }}
      ></Pagination>
    </Column>
  );
}
