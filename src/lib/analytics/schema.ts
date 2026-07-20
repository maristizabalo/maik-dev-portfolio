import { z } from "zod";

export const metaSchema = z.object({
  locale: z.string().optional(),
  theme: z.string().optional(),
  referrer: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
  screenW: z.number().optional(),
  screenH: z.number().optional(),
  viewportW: z.number().optional(),
  viewportH: z.number().optional(),
  utm_source: z.string().nullable().optional(),
  utm_medium: z.string().nullable().optional(),
  utm_campaign: z.string().nullable().optional(),
  utm_content: z.string().nullable().optional(),
  utm_term: z.string().nullable().optional(),
  entryPath: z.string().optional(),
});

export const trackSchema = z.object({
  sessionId: z.string().uuid(),
  meta: metaSchema.optional(),
  events: z
    .array(
      z.object({
        name: z.string().max(64),
        path: z.string().max(300),
        category: z.string().max(64).optional(),
        label: z.string().max(200).optional(),
        value: z.number().optional(),
        metadata: z.record(z.string(), z.unknown()).optional(),
      }),
    )
    .max(50),
});

export const sessionSchema = z.object({
  sessionId: z.string().uuid(),
  event: z.enum(["start", "end"]),
  meta: metaSchema.optional(),
  duration: z.number().optional(),
});
