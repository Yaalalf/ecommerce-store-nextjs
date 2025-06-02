export function assignKey<T>({
  propKey,
  item,
  index,
}: {
  propKey?: keyof T;
  item: T;
  index: number;
}): string | T {
  if (typeof item === "object" && item !== null) {
    if (propKey) {
      return item[propKey] as string;
    } else {
      return index.toString();
    }
  } else {
    return item;
  }
}
