import { Ticket } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useTickets = () => {
  return useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tickets`);
      if (!res.ok) throw new Error('Failed to fetch tickets');
      return res.json();
    },
  });
};
