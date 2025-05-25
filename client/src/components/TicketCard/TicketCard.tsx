import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import type { TicketCardProps } from './types';
import { useDraggable } from '@dnd-kit/core';
import { PRIORITY_BADGE_COLORS } from './constants';

export const TicketCard = ({ ticket, draggable }: TicketCardProps) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: ticket.id,
    disabled: !draggable,
  });

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* View button */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 z-[10]"
          >
            View
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ticket.subject}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              From: {ticket.from}
            </DialogDescription>
          </DialogHeader>
          <ul className="text-xs text-muted-foreground space-y-1 mb-4">
            <li>
              <strong>To:</strong> {ticket.to ?? 'N/A'}
            </li>
            <li>
              <strong>Reply-To:</strong> {ticket.replyTo ?? 'N/A'}
            </li>
          </ul>
          <div className="max-h-[60vh] overflow-auto whitespace-pre-wrap rounded bg-gray-50 p-4 text-sm leading-relaxed font-mono">
            {ticket.textBody}
          </div>
        </DialogContent>
      </Dialog>
      <div ref={setNodeRef}>
        <Card
          className="relative cursor-grab"
          {...(draggable ? listeners : {})}
          {...(draggable ? attributes : {})}
        >
          <CardContent className="p-4 space-y-2">
            <CardDescription>From: {ticket.from}</CardDescription>
            <CardTitle>Subject: {ticket.subject}</CardTitle>
            <CardDescription>
              {Intl.DateTimeFormat('en-US', {
                dateStyle: 'short',
                timeStyle: 'short',
              }).format(new Date(ticket.date))}
            </CardDescription>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{ticket.category}</Badge>
              <Badge
                className={PRIORITY_BADGE_COLORS[ticket.priority ?? 'NORMAL']}
              >
                {ticket.priority}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
