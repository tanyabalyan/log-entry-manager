import express from 'express';
import cors from 'cors';
import routes from './routes';
import { db } from './db';
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/logs', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const createTable = async () => {
    const database = await db;
    await database.exec(`
        CREATE TABLE IF NOT EXISTS log_entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT NOT NULL,
            description TEXT NOT NULL,
            eventDate TEXT NOT NULL,
            location TEXT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

createTable();
export default app;