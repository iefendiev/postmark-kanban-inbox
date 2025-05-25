import { TicketStatus } from './types';

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  REPLIED: 'Replied',
  RESOLVED: 'Resolved',
};
