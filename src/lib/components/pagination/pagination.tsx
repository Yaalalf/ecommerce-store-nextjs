"use client";
import { useState } from "react";
import Button from "../button";
import { List } from "../structure";
import { IPaginationProps } from "./types";

export default function Pagination({
  initialPage = 0,
  length,
  onChange,
}: IPaginationProps) {
  const [selectedIndex, setSelectedIndex] = useState(initialPage);

  const paginationData = Array(length)
    .fill(1)
    .map((data, index) => index + 1);

  return (
    <List
      className="pagination"
      align="center"
      justify="center"
      data={paginationData}
    >
      {(item, index) => (
        <Button
          onClick={() => {
            setSelectedIndex(index);
            if (onChange) {
              onChange(index);
            }
          }}
          severity={selectedIndex === index ? "primary" : "base"}
        >
          {item}
        </Button>
      )}
    </List>
  );
}
