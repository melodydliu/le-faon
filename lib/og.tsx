/** Shared pieces for generated share images (1200×630). */
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

export const ogColors = { bg: "#f4efe4", surface: "#eae3d6", ink: "#2a2514", secondary: "#51473f" };

export async function ogFonts() {
  const [regular, italic] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/EBGaramond-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/EBGaramond-Italic.ttf")),
  ]);
  return [
    { name: "EB Garamond", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "EB Garamond", data: italic, style: "italic" as const, weight: 400 as const },
  ];
}

/** Reads an image from /public as a data URI (JPEG, PNG or SVG), or null if missing. */
export async function publicImageDataUri(src: string): Promise<string | null> {
  try {
    const data = await readFile(join(process.cwd(), "public", src));
    const ext = src.split(".").pop()?.toLowerCase();
    const mime = ext === "svg" ? "image/svg+xml" : ext === "png" ? "image/png" : "image/jpeg";
    return `data:${mime};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
}
