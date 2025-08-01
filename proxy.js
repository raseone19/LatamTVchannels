const express = require('express');
const request = require('request');
const app = express();

app.get('/stream', (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('Missing url');

    const options = {
        url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36'
        }
    };

    request(options).pipe(res);
});

app.listen(5000, () => {
    console.log('Proxy running at http://127.0.0.1:5000');
});
