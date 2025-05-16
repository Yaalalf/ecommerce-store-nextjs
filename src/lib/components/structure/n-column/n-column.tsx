import { Row } from "../../layout";
import List from "../list";
import { INColumnProps } from "./types";

export default function NColumn<T>({
  children,
  data,
  className = "",
  propKey,
  columnsGap,
  itemsGap,
}: INColumnProps<T>) {
  const firstColumnData = data.filter((item, index) => {
    return index % 2 === 0;
  });
  const secondColumnData = data.filter((item, index) => {
    return index % 2 !== 0;
  });
  return (
    <Row className={`NColumn ${className}`} gap={columnsGap}>
      <List
        className="w-full"
        direction="column"
        gap={itemsGap}
        data={firstColumnData}
        propKey={propKey}
      >
        {children}
      </List>
      <List
        className="w-full"
        direction="column"
        gap={itemsGap}
        data={secondColumnData}
        propKey={propKey}
      >
        {children}
      </List>
    </Row>
  );
}
