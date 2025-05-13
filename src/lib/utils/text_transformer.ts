export function pascalCaseToWords(text: string) {
  return text
    .replace(/([A-Z])/g, " $1") // Insert space before each uppercase letter
    .trim() // Remove leading space
    .split(" ") // Split into words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter
    .join(" "); // Join words back into a single string
}
