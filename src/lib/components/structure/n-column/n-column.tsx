import { Row } from "../../layout";
import List from "../list";
import { INColumnProps } from "./types";

export default function NColumn<T>({
  children,
  data,
  className = "",
  propKey,
}: INColumnProps<T>) {
  const firstColumnData = data.filter((item, index) => {
    return index % 2 === 0;
  });
  const secondColumnData = data.filter((item, index) => {
    return index % 2 !== 0;
  });
  return (
    <Row className={`NColumn ${className}`} gap="20">
      <List
        direction="column"
        gap="20"
        data={firstColumnData}
        propKey={propKey}
      >
        {children}
      </List>
      <List
        direction="column"
        gap="20"
        data={secondColumnData}
        propKey={propKey}
      >
        {children}
      </List>
    </Row>
  );
}
