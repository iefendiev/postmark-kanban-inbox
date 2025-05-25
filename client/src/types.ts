// TODO define an api contract to share types

export const TICKET_STATUSES = [
  'OPEN',
  'IN_PROGRESS',
  'REPLIED',
  'RESOLVED',
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

export enum TicketPriority {
  HIGH = 'HIGH',
  NORMAL = 'NORMAL',
  LOW = 'LOW',
}

export enum TicketCategory {
  BILLING = 'BILLING',
  ACCOUNT = 'ACCOUNT',
  TECHNICAL = 'TECHNICAL',
  GENERAL = 'GENERAL',
}

export type Ticket = {
  id: string;
  subject: string;
  from: string;
  fromName?: string;
  to?: string;
  cc?: string;
  bcc?: string;
  replyTo?: string;
  date: string; // ISO string
  messageId?: string;
  textBody?: string;
  htmlBody?: string;
  strippedReply?: string;

  category?: TicketCategory;
  priority?: TicketPriority;
  status?: TicketStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string

  attachments?: {
    name: string;
    content: string; // base64
    contentType: string;
    contentLength: number;
    contentID?: string;
  }[];
};
