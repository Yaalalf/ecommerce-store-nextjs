export function sanitatedClientData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
