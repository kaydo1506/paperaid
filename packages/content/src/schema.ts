import { z } from "zod";

const localizedStringSchema = z.object({
  en: z.string().min(1),
  de: z.string().min(1),
});
export type LocalizedString = z.infer<typeof localizedStringSchema>;

const stepSchema = z.object({
  id: z.string().min(1),
  title: localizedStringSchema,
  description: localizedStringSchema,
});

export const guideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be kebab-case"),
  city: z.literal("berlin"),
  title: localizedStringSchema,
  summary: localizedStringSchema,
  officialSourceUrl: z.string().url(),
  lastChecked: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "lastChecked must be YYYY-MM-DD"),
  cost: localizedStringSchema,
  timeline: localizedStringSchema,
  whereToGo: localizedStringSchema,
  requiredDocuments: z.array(localizedStringSchema).min(1),
  steps: z.array(stepSchema).min(1),
});

export type Guide = z.infer<typeof guideSchema>;
