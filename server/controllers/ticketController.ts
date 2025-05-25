import { Request, Response } from 'express';
import {
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
  createTicket,
} from '../services/ticketService';

import { inferCategoryAndPriority } from '../utils/nlp';

export const handleInboundEmail = async (req: Request, res: Response) => {
  const email = req.body;

  if (!email?.Subject || !email?.TextBody || !email?.From || !email?.Date) {
    return res.status(400).json({ error: 'Invalid email payload' });
  }

  const combinedText = `${email.Subject}\n${email.TextBody}`;

  const { category, priority } = await inferCategoryAndPriority(combinedText);

  await createTicket({
    from: email.From,
    subject: email.Subject,
    date: new Date(email.Date),
    textBody: email.TextBody,
    htmlBody: email.HtmlBody,
    strippedReply: email.StrippedTextReply,
    attachments: email.Attachments,
    category,
    priority,
  });

  res.sendStatus(200);
};

export const getTicketsHandler = async (_req: Request, res: Response) => {
  const tickets = await getAllTickets();
  res.json(tickets);
};

export const getTicketByIdHandler = async (req: Request, res: Response) => {
  const ticket = await getTicketById(req.params.id);
  if (!ticket) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }
  res.json(ticket);
};

export const updateTicketHandler = async (req: Request, res: Response) => {
  const updated = await updateTicket(req.params.id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Ticket not found' });
    return;
  }
  res.json(updated);
};

export const deleteTicketHandler = async (req: Request, res: Response) => {
  await deleteTicket(req.params.id);
  res.sendStatus(204);
};
