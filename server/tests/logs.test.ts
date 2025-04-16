import request from 'supertest';
import app from '../src/index';
import { describe, it, expect } from '@jest/globals';

describe('POST /api/logs', () => {
    it('should create a new log entry', async () => {
        const response = await request(app).post('/api/logs').send({
            userName: 'John Doe',
            description: 'Test log entry',
            eventDate: '2021-01-01',
            location: 'Test location'
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Log entry created successfully');
    });
});

describe('GET /api/logs', () => {
    it('should return all logs', async () => {
        const response = await request(app).get('/api/logs');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});