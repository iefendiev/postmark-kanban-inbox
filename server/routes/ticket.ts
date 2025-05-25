import express from 'express';
import {
  getTicketsHandler,
  getTicketByIdHandler,
  updateTicketHandler,
  deleteTicketHandler,
} from '../controllers/ticketController';

const router = express.Router();

router.get('/', (req, res) => getTicketsHandler(req, res));
router.get('/:id', (req, res) => getTicketByIdHandler(req, res));
router.patch('/:id', (req, res) => updateTicketHandler(req, res));
router.delete('/:id', (req, res) => deleteTicketHandler(req, res));

export default router;
