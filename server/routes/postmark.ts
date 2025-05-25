import { Router, RequestHandler } from 'express';
import { createTicket } from '../services/ticketService';
import { inferCategoryAndPriority } from '../utils/nlp';
import { TicketStatus } from '@prisma/client';

const router = Router();

export const handleInboundEmail: RequestHandler = async (req, res) => {
  const email = req.body;

  const combinedText = `${email.Subject}\n${email.TextBody}`;

  const { category, priority } = await inferCategoryAndPriority(combinedText);

  const {
    From,
    FromName,
    To,
    Cc,
    Bcc,
    ReplyTo,
    Subject,
    Date: emailDate,
    MessageID,
    TextBody,
    HtmlBody,
    StrippedTextReply,
    Attachments,
  } = email;

  await createTicket({
    from: From,
    fromName: FromName,
    to: To,
    cc: Cc,
    bcc: Bcc,
    replyTo: ReplyTo,
    subject: Subject,
    date: new Date(emailDate),
    messageId: MessageID,
    textBody: TextBody,
    htmlBody: HtmlBody,
    strippedReply: StrippedTextReply,
    attachments: Attachments,
    category,
    priority,
    status: TicketStatus.OPEN,
  });

  res.sendStatus(200);
};

// Register the route
router.post('/inbound', handleInboundEmail);

export default router;
