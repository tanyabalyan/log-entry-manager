import express from 'express';
import { db } from './db';

const routes = express.Router();


routes.get('/', async (req, res) => {
    const database = await db;
    const logs = await database.all('SELECT * FROM log_entries');
    res.json(logs);
});

routes.post('/', async (req, res) => {
    const database = await db;
    const { userName, description, eventDate, location } = req.body;
    await database.run('INSERT INTO log_entries (userName, description, eventDate, location) VALUES (?, ?, ?, ?)', [userName, description, eventDate, location]);
    res.status(201).json({ message: 'Log entry created successfully' });
});

routes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { userName, description, eventDate, location } = req.body;
    const database = await db;
    await database.run('UPDATE log_entries SET userName = ?, description = ?, eventDate = ?, location = ? WHERE id = ?', [userName, description, eventDate, location, id]);
    res.json({ message: 'Log entry updated successfully' });
});

routes.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const database = await db;
    await database.run('DELETE FROM log_entries WHERE id = ?', [id]);
    res.json({ message: 'Log entry deleted successfully' });
});

export default routes;