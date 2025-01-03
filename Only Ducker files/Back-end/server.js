import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 5000;


const API_KEY = 'Your API Key';
const COHERE_API_URL = 'Your API URL';


app.use(cors());
app.use(bodyParser.json());



app.post('/chat', async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const response = await fetch(COHERE_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'command-xlarge-nightly',
                prompt: message,
                max_tokens: 100,
            }),
        });

        const data = await response.json();
        const reply = data.generations?.[0]?.text || 'No response from API';


        res.json({ reply });
    } catch (error) {
        console.error('Error fetching data from Cohere API:', error);
        res.status(500).json({ error: 'Failed to communicate with Cohere API' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
});
