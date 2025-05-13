import { Flex } from "../../layout";
import { IBeside } from "./types";

export default function Beside({
  after,
  before,
  align,
  justify,
  direction,
  children,
  className = "",
}: IBeside) {
  return (
    <Flex
      {...{ align, justify, direction, gap: "8" }}
      className={`beside ${className}`}
    >
      {before}
      {children}
      {after}
    </Flex>
  );
}
