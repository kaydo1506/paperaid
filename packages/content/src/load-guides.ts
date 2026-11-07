import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse as parseYaml } from "yaml";
import { guideSchema, type Guide } from "./schema";

const guidesDir = join(dirname(fileURLToPath(import.meta.url)), "guides");

export function loadGuides(): Guide[] {
  const files = readdirSync(guidesDir).filter((file) => file.endsWith(".yaml"));

  return files.map((file) => {
    const raw = readFileSync(join(guidesDir, file), "utf-8");
    const data = parseYaml(raw);
    const result = guideSchema.safeParse(data);

    if (!result.success) {
      throw new Error(
        `Invalid guide content in ${file}:\n${result.error.message}`,
      );
    }

    return result.data;
  });
}
