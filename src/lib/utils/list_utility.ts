export function assignKey<T>({
  propKey,
  item,
  index,
}: {
  propKey?: keyof T;
  item: T;
  index: number;
}): string {
  if (typeof item === "object" && item !== null) {
    if (propKey) {
      return item[propKey] as string;
    } else {
      return index.toString();
    }
  } else {
    return index.toString();
  }
}
