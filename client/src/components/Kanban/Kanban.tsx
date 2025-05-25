import { useCallback, useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import ReactConfetti from 'react-confetti';
import { closestCorners, DndContext, DragEndEvent } from '@dnd-kit/core';
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TicketCard } from '../TicketCard/TicketCard';
import { TICKET_STATUS_LABELS } from '../../constants';
import { useTickets } from '../../hooks/useTickets';
import { Ticket, TICKET_STATUSES, TicketStatus } from '../../types';
import { DroppableColumn } from './DroppableColumn/DroppableColumn';

const Kanban = () => {
  const { width, height } = useWindowSize();

  const queryClient = useQueryClient();
  const { data: tickets, isLoading, error } = useTickets();

  const [lastResolvedTicket, setLastResolvedTicket] = useState<string>('');
  useEffect(() => {
    if (!lastResolvedTicket) return;

    const timeout = setTimeout(() => {
      setLastResolvedTicket('');
    }, 10000);

    return () => clearTimeout(timeout);
  }, [lastResolvedTicket]);

  const { mutate: updateTicket } = useMutation<
    Ticket,
    Error,
    {
      id: string;
      status: TicketStatus;
    }
  >({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: TicketStatus;
    }) => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/tickets/${id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status }),
        }
      );
      return response.json();
    },
    onSuccess: (response: Ticket) => {
      if (response.status === 'RESOLVED') {
        setLastResolvedTicket(response.id);
      }
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
    },
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const onDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      const ticketId = active.id.toString();
      const targetStatus = over?.id as TicketStatus;

      if (!targetStatus || !TICKET_STATUSES.includes(targetStatus)) return;

      const currentTicket = tickets?.find((t) => t.id === ticketId);

      // Do not update the ticket if it is already in the target status
      if (currentTicket?.status === targetStatus) {
        return;
      }

      updateTicket({ id: ticketId, status: targetStatus });
    },
    [updateTicket, tickets]
  );

  if (isLoading) return <p>Loading tickets...</p>;
  if (error) return <p>Failed to load tickets</p>;
  if (!tickets?.length) return <p>No tickets found</p>;

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={onDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 h-screen">
          {TICKET_STATUSES.map((status) => (
            <DroppableColumn key={status} status={status}>
              <h3 className="text-lg font-semibold mb-2 text-center bg-blue-500/10 dark:bg-blue-500/10 rounded-lg py-2 px-4">
                {TICKET_STATUS_LABELS[status]}
              </h3>
              <div className="flex flex-col gap-2">
                {tickets
                  .filter((t) => t.status === status)
                  .toSorted(
                    (a, b) =>
                      new Date(a.updatedAt).getTime() -
                      new Date(b.updatedAt).getTime()
                  )
                  .map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} draggable />
                  ))}
              </div>
            </DroppableColumn>
          ))}
        </div>
      </DndContext>
      {lastResolvedTicket && (
        <ReactConfetti
          width={width}
          height={height}
          numberOfPieces={150}
          recycle={false}
        />
      )}
    </>
  );
};

export default Kanban;
