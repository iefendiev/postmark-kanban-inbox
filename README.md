# 📬 Postmark Kanban Inbox

## 📌 Overview

This app is a simple, end-to-end **email-based ticket management system** powered by Postmark's **inbound email parsing** feature.

Here's how it works:

1. A customer sends an email to your Postmark inbound address (e.g. support@yourdomain).
2. The email payload is received by a webhook and parsed by the backend.
3. Using a **language model (Hugging Face)**, the email's subject and body are analyzed to automatically infer the ticket's **category** and **priority**.
4. A ticket is created and displayed in the frontend Kanban board.
5. Support team members can drag and drop tickets across columns like **Open**, **In Progress**, **Replied**, and **Resolved** — mimicking a real-world support workflow.
6. Once the issue is resolved, the ticket is moved to the **Resolved** column — completing the support loop.

The goal is to turn messy, free-form customer emails into structured, categorized, and prioritized support tickets — **without any manual effort**.

## 🚀 Features

- ✅ Inbound Email Parsing via Postmark Webhooks
- ✅ Ticket Categorization via Hugging Face NLP (zero config)
- ✅ Drag-and-Drop Status Columns using @dnd-kit
- ✅ Confetti Celebration when tickets are marked as Resolved
- ✅ Detailed Email Viewer with modal dialog
- ✅ Prisma + SQLite backend with full ticket schema

## 🧠 Tech Stack

### Backend

- Node.js + Express
- Prisma ORM (SQLite)
- Postmark inbound webhook integration
- Hugging Face inference API (zero-dependency NLP)

### Frontend

- Vite + React + TypeScript
- Shadcn UI + Tailwind CSS
- Dnd-kit for drag-and-drop support
- TanStack Query for data caching & updates

## 📥 How to Test It

### 1. Run Locally

```bash
# Clone the repo
git clone https://github.com/iefendiev/postmark-kanban-inbox
cd postmark-kanban-inbox

# Install server dependencies
cd server
npm install
cp .env.example .env

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Postmark

- Create a Postmark account
- Create a Message Stream (type: Inbound)
- Set your Webhook URL to your server (e.g. using ngrok http 3000) at `/api/emails/inbound`

### 3. Run Dev Servers

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

### 4. Send a Test Email

Send an email to the address provided by Postmark. The message will appear on the Kanban board automatically.

> 💡 **Tip:** If you're running the backend locally, you can expose it to Postmark using [`ngrok`](https://ngrok.com/):
>
> ```bash
> ngrok http 3000
> ```
>
> Then use the generated URL (e.g. `https://abc123.ngrok-free.app/api/emails/inbound`) as your Postmark **inbound webhook URL**:
>
> ```
> e.g. `h4sh3d@inbound.postmarkapp.com`
> ```

Alternatively, you can use the provided `postmarkWebhookTest.json` file to simulate incoming emails. With your server running, execute this command in your terminal:

```bash
jq -c '.[]' postmarkWebhookTest.json | while read -r payload; do
  curl -X POST http://localhost:3000/api/emails/inbound \
    -H "Content-Type: application/json" \
    -d "$payload"
done
```

## ✨ AI-Powered Categorization

Emails are processed with the `facebook/bart-large-mnli` model from Hugging Face. The API call infers priority and category from the subject and body content. No fine-tuning required.

Ensure you have a Hugging Face API key in `.env`:

```env
HF_API_KEY=your_token_here
```

> ⚠️ For production, consider deploying with a proxy server or secure secrets management.

## 🎥 Demo

![Demo in action](./assets/app-demo.gif)

## 📂 Project Structure

```
.
├── client/ # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── lib/
│   └── ...
├── server/ # Express backend
│   ├── routes/
│   ├── services/
│   ├── controllers/
│   ├── prisma/
│   └── ...
└── README.md
```

## 🧪 Roadmap / What's Next

- [ ] Add response support (reply to email from UI)
- [ ] API contact and typesafe communication using OpenAPI (e.g. zod-to-openapi or tRPC + OpenAPI plugin)
- [ ] Pagination or archived tickets view
- [ ] Auth layer for multi-user support
- [ ] Email threading / grouping

## 🏁 License

MIT

## 💌 Credits

Built for the Postmark Challenge: Inbox Innovators by İpek Efendiev
