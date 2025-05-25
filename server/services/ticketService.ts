import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createTicket = async (
  data: Omit<Prisma.TicketCreateInput, 'updatedAt'>
) => {
  return await prisma.ticket.create({
    data,
  });
};

export const getAllTickets = async () => {
  return await prisma.ticket.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const getTicketById = async (id: string) => {
  return await prisma.ticket.findUnique({
    where: { id },
  });
};

export const updateTicket = async (
  id: string,
  update: Prisma.TicketUpdateInput
) => {
  return await prisma.ticket.update({
    where: { id },
    data: update,
  });
};

export const deleteTicket = async (id: string) => {
  await prisma.ticket.delete({ where: { id } });
};
