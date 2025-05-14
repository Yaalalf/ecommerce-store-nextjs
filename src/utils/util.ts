export function sanitatedClientData<T>(data: T) {
  return JSON.parse(JSON.stringify(data));
}
