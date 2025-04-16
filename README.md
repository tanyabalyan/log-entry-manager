## Getting Started

# 📝 Log Entry Manager

A full-stack web application that allows users to create, read, update, and delete (CRUD) log entries, each containing a user's name, description, event date, and location.

---

🔧 Prerequisites

Node.js (v18 or higher recommended)
npm (comes with Node.js)
A modern web browser (Chrome, Safari)

You can verify installation:
```bash
node -v
npm -v
```
## 📦 Tech Stack

**Frontend**:  
- React + TypeScript (via Vite)

**Backend**:  
- Node.js + Express  
- TypeScript  
- SQLite3 (local, lightweight database)
- Jest (unit tests)

---

## 🚀 Features

- Add, edit, delete, and view log entries (CRUD operations)
- Auto-fill user name from last saved entry
- Responsive design (desktop + mobile)
- Local development setup (no cloud storage required)
- Two unit tests for backend 

---

## 🛠️ Setup Instructions

1. Clone the Repository

```bash
git clone https://github.com/tanyabalyan/log-entry-manager.git
cd log-entry-manager
```
2. Install server dependencies: 

```bash
cd server
npm install
npx tsc --init                # Initialize TypeScript if not already done

npm start                     # Start the server
                              
npx kill-port 3001            # Use this if the port address is already in use 

npx jest                      # Running two unit tests on the server
```
- Server will run at http://localhost:3001
- Logs will be stored locally in data/logs.db

3. Install client dependencies: 

```bash
cd client
npm install
npm run dev

```
- App runs at: http://localhost:5173 (or similar)

