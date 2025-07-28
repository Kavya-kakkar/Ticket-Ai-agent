# 🎫 Ticket AI Agent

**Ticket AI Agent** is a smart support ticketing system powered by AI. Built using **React.js** for the frontend and **Node.js** with Express for the backend, it automates and streamlines customer service ticket management, response generation, and assignment.

---

## 🚀 Features

- 🧠 AI-assisted ticket classification and handling
- 🔐 User authentication and role-based access (Admin, Agent, User)
- 💬 Real-time ticket updates and status tracking
- 📬 Email notifications for ticket activities
- 📊 Admin dashboard for managing users and tickets
- ⚙️ Inngest-powered background processing for workflows

---

## 🛠️ Tech Stack

| Technology     | Role                                     |
|----------------|------------------------------------------|
| **React.js**   | Frontend library for building the UI     |
| **Node.js**    | Backend runtime environment              |
| **Express.js** | Web server framework for REST APIs       |
| **Vite**       | Frontend build tool                      |
| **JavaScript** | Main programming language                |
| **HTML/CSS**   | Layout and styling                       |
| **Inngest**    | Background job & workflow orchestration  |
| **JWT**        | Authentication & session management      |
| **Mailer (Nodemailer)** | Email notifications             |

---

## 📁 Project Structure

Ticket Ai agent/
│
├── ai-Ticket-frontend/ # React.js frontend
│ ├── src/pages/ # App pages (admin, login, signup, tickets)
│ ├── src/assets/ # Static assets
│ └── vite.config.js # Vite config
│
├── ai-ticket-assitant/ # Node.js + Express backend
│ ├── controllers/ # Ticket & user logic
│ ├── models/ # MongoDB schemas (if using MongoDB)
│ ├── routes/ # API routes
│ ├── utils/ # AI logic and email utils
│ └── inngest/ # Workflow functions
│
└── .gitignore

📦 Setup Frontend
cd ai-Ticket-frontend
npm install
npm run dev

🔌 Setup Backend

cd ../ai-ticket-assitant
npm install
cp .env.sample .env     # Configure your secrets
npm start               # or: nodemon index.js

🙋‍♀️ Author
Kavya Kakkar
Final-year Computer Science Engineering student
📌 Passionate about automation, AI, and full-stack development.


