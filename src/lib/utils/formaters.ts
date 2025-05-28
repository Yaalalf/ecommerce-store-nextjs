/**
 * Formatea un número de bytes en una cadena legible con la unidad más apropiada
 * (Bytes, KB, MB, GB, TB, PB, etc.).
 *
 * @param {number} bytes El número de bytes a formatear.
 * @param {number} [decimals=2] El número de decimales a mantener en el resultado (por defecto es 2).
 * @returns {string} El número formateado con su unidad.
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  // Si el número de bytes es 0, devolvemos '0 Bytes' directamente.
  if (bytes <= 0) {
    return "0 Bytes";
  }

  // Aseguramos que el número de decimales sea no negativo.
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  // Definimos las unidades de tamaño.
  const sizes: string[] = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
    "PB",
    "EB",
    "ZB",
    "YB",
  ];

  // Calculamos el índice de la unidad apropiada usando logaritmos.
  // Esto nos dice cuántas veces podemos dividir los bytes por 1024 antes de que sean menores que 1024.
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  console.log("Logaritmo: ", i);
  // Formateamos el número y concatenamos la unidad.
  // bytes / (k elevado a la potencia i) nos da el valor en la unidad correcta.
  // toFixed(dm) lo redondea a los decimales deseados.
  // parseFloat convierte la cadena resultante de toFixed de nuevo a número para eliminar ceros finales innecesarios.
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Formats a given date relative to the current date.
 * - If the date is within the next 7 days, it shows the difference (e.g., "3 days from now").
 * - If the date is beyond 7 days but within the current year, it shows "Day, Month" (e.g., "28 May").
 * - If the date is in a future year, it shows "Day, Month, Year" (e.g., "28 May 2026").
 *
 * @param {Date | string} dateInput The date to format. Can be a Date object or a date string.
 * @returns {string} The formatted date string.
 */
export function formatRelativeDate(dateInput: Date | string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize today to the start of the day

  let targetDate: Date;

  // Handle different input types
  if (typeof dateInput === "string") {
    targetDate = new Date(dateInput);
  } else if (dateInput instanceof Date) {
    targetDate = new Date(dateInput.getTime()); // Create a copy to avoid modifying original
  } else {
    return "Invalid Date"; // Or throw an error
  }

  targetDate.setHours(0, 0, 0, 0); // Normalize targetDate to the start of the day

  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate difference in days

  // const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;

  // Option 1: Within the next 7 days
  if (diffDays >= 0 && diffDays <= 7) {
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else {
      return `${diffDays} days`;
    }
  }

  // Option 2: Beyond 7 days but within the same year
  if (targetDate.getFullYear() === today.getFullYear()) {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
    };
    return targetDate.toLocaleDateString("en-US", options); // e.g., "28 May"
  }

  // Option 3: In a future year
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  return targetDate.toLocaleDateString("en-US", options); // e.g., "28 May 2026"
}

/**
 * Extrae la extensión de un nombre de archivo.
 * La extensión se considera la parte de la cadena después del último punto.
 * Por ejemplo: "imagen.webp" -> "webp"
 * "documento.de.texto.pdf" -> "pdf"
 * "archivo_sin_extension" -> "" (cadena vacía)
 *
 * @param {string} fileName El nombre del archivo (puede incluir la ruta).
 * @returns {string} La extensión del archivo en minúsculas, o una cadena vacía si no tiene extensión.
 */
/**
 * Extrae el nombre base y la extensión de un nombre de archivo.
 *
 * @param {string} fileName El nombre completo del archivo (puede incluir la ruta).
 * @returns {{ name: string; extension: string }} Un objeto que contiene:
 * - `name`: El nombre del archivo sin la extensión.
 * - `extension`: La extensión del archivo en minúsculas (ej. "webp", "pdf"), o una cadena vacía si no tiene extensión.
 */
export function getFileNameAndExtension(fileName: string): {
  name: string;
  extension: string;
} {
  // Validar que fileName sea una cadena.
  if (typeof fileName !== "string") {
    console.warn("getFileNameAndExtension: Input must be a string.");
    return { name: "", extension: "" };
  }

  const lastDotIndex = fileName.lastIndexOf(".");
  let name = fileName;
  let extension = "";

  // Si hay un punto y no es el primer carácter (para evitar tratar ".bashrc" como si tuviera extensión)
  if (lastDotIndex !== -1 && lastDotIndex !== 0) {
    name = fileName.substring(0, lastDotIndex);
    extension = fileName.substring(lastDotIndex + 1).toLowerCase();
  }

  return { name, extension };
}
