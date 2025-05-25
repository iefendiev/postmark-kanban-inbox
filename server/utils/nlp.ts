import fetch from 'node-fetch';
import { HFResponseSchema } from './types'; // Zod şeman burada olmalı
import {
  CATEGORY_LABELS,
  PRIORITY_LABELS,
  CATEGORY_MATCH_MAP,
  PRIORITY_MATCH_MAP,
} from './constants';
import { TicketCategory, TicketPriority } from '@prisma/client';

const HUGGINGFACE_API =
  'https://api-inference.huggingface.co/models/facebook/bart-large-mnli';

const callHF = async (
  text: string,
  labels: string[]
): Promise<string | null> => {
  const res = await fetch(HUGGINGFACE_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.HF_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: text,
      parameters: { candidate_labels: labels },
    }),
  });

  const json = await res.json();
  const parsed = HFResponseSchema.safeParse(json);

  if (!parsed.success || (parsed.data && 'error' in parsed.data)) {
    console.error(
      'HF error:',
      parsed.data && 'error' in parsed.data ? parsed.data.error : parsed.error
    );
    return null;
  }

  return parsed.data.labels[0]; // top prediction
};

export const inferCategoryHF = async (
  text: string
): Promise<TicketCategory> => {
  const label = await callHF(text, CATEGORY_LABELS);
  return label && label in CATEGORY_MATCH_MAP
    ? CATEGORY_MATCH_MAP[label]
    : 'GENERAL';
};

export const inferPriorityHF = async (
  text: string
): Promise<TicketPriority> => {
  const label = await callHF(text, PRIORITY_LABELS);
  return label && label in PRIORITY_MATCH_MAP
    ? PRIORITY_MATCH_MAP[label]
    : 'NORMAL';
};

export const inferCategoryAndPriority = async (
  text: string
): Promise<{ category: TicketCategory; priority: TicketPriority }> => {
  const [category, priority] = await Promise.all([
    inferCategoryHF(text),
    inferPriorityHF(text),
  ]);
  return { category, priority };
};
