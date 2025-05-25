import { TicketStatus } from '@/types';
import { PropsWithChildren } from 'react';

export interface DroppableColumnProps extends PropsWithChildren {
  status: TicketStatus;
}
