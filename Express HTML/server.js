import express from 'express';
import fs from 'fs';
const app = express();
const PORT = 3000;
app.get('/', (req, res) => {
    fs.readFile('./Pages/index.html', 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send("Error reading file");
            return;
        }
        res.send(data);
    });
});

app.get('/about', (req, res) => {
    fs.readFile('./Pages/about.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading file");
            return;
        }
        res.send(data);
    });
});

app.get('/contact', (req, res) => {
    fs.readFile('./Pages/contact.html', 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send("Error reading file");
            return;
        }
        res.send(data);
    });
});

app.listen(PORT,() => {
    console.log(`Server running at http://localhost:${PORT}`);
});