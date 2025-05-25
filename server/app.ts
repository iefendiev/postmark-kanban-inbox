import express from 'express';
import cors from 'cors';
import postmarkRoutes from './routes/postmark';
import ticketRoutes from './routes/ticket';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use('/api/emails', postmarkRoutes);
app.use('/api/tickets', ticketRoutes);

export default app;
