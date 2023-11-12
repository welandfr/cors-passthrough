import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 8080

const app = express();
app.use(cors())
app.use(express.json())

app.use('/', async (req, res) => {

    console.log({
        'x-api-key': req.headers['x-api-key'],
        'x-url': req.headers['x-url'],
        method: req.method

    })

    if (req.headers['x-api-key'] != process.env.API_KEY)
        return res.status(401).json({ error: "Bad/missing key in authorization header" })

    try {
        
        const response = await fetch(req.headers['x-url'], {
            method: req.method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data)
    } catch (error) {
        console.error('Error:', error.message);

    }    
})

app.listen(PORT, () => {
    try {
        console.log(`Running on port ${PORT}`)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})