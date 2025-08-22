export function formatWithCommas(value: number | string): string {
  if (value === null || value === undefined) return "";
  return Number(value).toLocaleString("en-MY");
}
