import List from "../list";
import { INColumnProps } from "./types";

export default function NColumn<T>({
  children,
  data,
  className = "",
  propKey,
  columnsGap,
  itemsGap,
  columns = 2,
}: INColumnProps<T>) {
  const columnsDataLists: T[][] = [...Array(columns)];

  for (let index = 0; index < data.length; index++) {
    const indexer = index % columns;
    if (!Array.isArray(columnsDataLists[indexer])) {
      columnsDataLists[indexer] = [];
    }
    columnsDataLists[indexer].push(data[index]);
  }
  return (
    <List
      data={columnsDataLists}
      className={`n-column ${className}`}
      direction="row"
      gap={columnsGap}
      unwrap
    >
      {(lists) => (
        <List
          className="w-[100%]"
          direction="column"
          gap={itemsGap}
          data={lists}
          propKey={propKey}
          // pt={{ item: { className: "w-full" } }}
        >
          {children}
        </List>
      )}
    </List>
  );
}
