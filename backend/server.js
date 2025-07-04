import express from 'express'
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({origin:'*'}))
const API_BASE_URL = process.env.API_BASE_URL;
// Fetching the events
app.get('/events', async (req, res) => {
    const { limit = 5, days = 10, status = 'open', source } = req.query; // defaulting variables if not passed
  
    const params = new URLSearchParams({ limit, days, status });
    if (source) params.append('source', source); // add source only if passed
  
    const url = `${API_BASE_URL}/events?${params.toString()}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
});
// Fetching all available categories and formatting to send to front-end
app.get('/all-categories', async (req, res) => {
    const url = `${API_BASE_URL}/categories`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const formatted = data.categories.map(cat => ({
        label: cat.title,
        id: cat.id
      }));
      res.json(formatted);
    } catch (err) {
      console.error('Error fetching categories:', err);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
// Fetching events of specific category with category ID passed as path parameter
app.get('/category/:id', async (req, res) => {
    const { limit = 5, days = 10, status = 'open', source } = req.query;
    const categoryId = req.params.id;

    const params = new URLSearchParams({ limit, days, status });
    if (source) params.append('source', source);

    const url = `${API_BASE_URL}/categories/${categoryId}?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error fetching events by category:', err);
        res.status(500).json({ error: 'Failed to fetch events by category' });
    }
});
// Fetching available list of sources
app.get('/sources', async (req, res) => {
    const url = `${API_BASE_URL}/sources`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data.sources);
    } catch (err) {
      console.error('Error fetching sources:', err);
      res.status(500).json({ error: 'Failed to fetch sources' });
    }
  });

const PORT = process.env.PORT || 5000;
if(process.env.NODE_ENV !== 'test'){ // Not starting server when in test
    app.listen(PORT,() => {
        console.log("Server running on port "+ PORT);
    });
}
export default app;