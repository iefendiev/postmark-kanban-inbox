import { TicketCategory, TicketPriority } from '@prisma/client';
import { flatMap, uniq } from 'lodash';

export const CATEGORY_KEYWORDS: Record<TicketCategory, string[]> = {
  BILLING: ['billing', 'payment', 'invoice', 'receipt', 'charge', 'refund'],
  TECHNICAL: ['bug', 'crash', 'error', 'technical', 'failed', 'issue'],
  ACCOUNT: ['account', 'login', 'password', 'username', 'credentials'],
  GENERAL: ['question', 'info', 'contact', 'other', 'misc'],
};

export const PRIORITY_KEYWORDS: Record<TicketPriority, string[]> = {
  HIGH: ['urgent', 'asap', 'immediately', 'now', 'critical'],
  NORMAL: ['normal', 'standard', 'routine'],
  LOW: ['later', 'whenever', 'not urgent', 'minor'],
};

export const CATEGORY_LABELS = uniq(flatMap(Object.values(CATEGORY_KEYWORDS)));
export const PRIORITY_LABELS = uniq(flatMap(Object.values(PRIORITY_KEYWORDS)));

export const CATEGORY_MATCH_MAP: Record<string, TicketCategory> = {};
Object.entries(CATEGORY_KEYWORDS).forEach(([category, words]) => {
  words.forEach((word) => {
    CATEGORY_MATCH_MAP[word] = category as TicketCategory;
  });
});

export const PRIORITY_MATCH_MAP: Record<string, TicketPriority> = {};
Object.entries<string[]>(PRIORITY_KEYWORDS).forEach(([priority, words]) => {
  words.forEach((word) => {
    PRIORITY_MATCH_MAP[word] = priority as TicketPriority;
  });
});
