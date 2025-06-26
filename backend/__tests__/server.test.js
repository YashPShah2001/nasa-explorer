import request from 'supertest';
import app from '../server.js';

describe('GET /events', () => {
  it('should return a list of events', async () => {
    const res = await request(app).get('/events?limit=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.events).toBeDefined();
    expect(Array.isArray(res.body.events)).toBe(true);
  });
});

describe('GET /category/:id', () => {
    it('should return a list of events for the category', async () => {
    const categoryId = 8;
      const res = await request(app).get(`/category/${categoryId}/?limit=1`);
      expect(res.statusCode).toBe(200);
      expect(res.body.events).toBeDefined();
      expect(Array.isArray(res.body.events)).toBe(true);
    });
  });

describe('GET /sources', () => {
  it('should return a list of sources', async () => {
    const res = await request(app).get('/sources');
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('GET /all-categories', () => {
    it('should return list of all categories', async () => {
        const res = await request(app).get('/all-categories');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
    })
});

