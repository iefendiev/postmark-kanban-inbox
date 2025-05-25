import { z } from 'zod';

export const HFClassificationResponseSchema = z.object({
  sequence: z.string(),
  labels: z.array(z.string()),
  scores: z.array(z.number()),
});

export const HFErrorResponseSchema = z.object({
  error: z.string(),
});

export const HFResponseSchema = z.union([
  HFClassificationResponseSchema,
  HFErrorResponseSchema,
]);

export type HFClassificationResponse = z.infer<
  typeof HFClassificationResponseSchema
>;
export type HFErrorResponse = z.infer<typeof HFErrorResponseSchema>;
