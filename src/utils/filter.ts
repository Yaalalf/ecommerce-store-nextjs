export function filterDataByFieldWithValue<T, K extends keyof T>(
  data: T[],
  options: { field: K; value: T[K]; distinct?: boolean }
) {
  const { field, value, distinct = false } = options;

  return data.filter((d) =>
    distinct ? d[field] !== value : d[field] === value
  );
}
