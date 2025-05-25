import { TicketPriority } from '@/types';

export const PRIORITY_BADGE_COLORS: Record<TicketPriority, string> = {
  HIGH: 'bg-red-500 text-white',
  NORMAL: 'bg-yellow-500 text-white',
  LOW: 'bg-blue-500 text-white',
};
