require('dotenv').config()
const express = require('express');
const app = express();
const axios = require('axios');
const apiUrl = "https://randommer.io/api/Phone/Countries";

app.get('/', (req, res) => {
    res.send("Hello API")
})

app.get('/countries', async (req, res, next) => {
    try {
        if(!process.env.RANDOMMER_API_TOKEN) {
            throw new Error("You forgot to set RANDOMMER_API_TOKEN");
        }
        const result = await axios.get(apiUrl, {
            headers: {
                "X-Api-Key": process.env.RANDOMMER_API_TOKEN
            }
        });
        res.json(result.data)
    } catch (error) {
        next(error);
    }    
})

app.listen(3000, () => {
    console.log("started")
})