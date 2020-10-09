import path from 'path';
const express = require('express');
const bodyParser = require('body-parser');
const app = express(),
            DIST_DIR = __dirname;

const files = [];
app.use(express.static(DIST_DIR));
app.use(bodyParser.json());
app.route('/files').get((req, res) => {
    res.send(files)
}).post((req, res) => {
    files.push({...req.body.json(), id: Math.floor(Math.random() * 100) + 1);
    res.send(files);
}).put((req, res) => {
    const reqBody = req.body.json();
    const fileIndex = files.findIndex((file) => file.name = reqBody.id);
    if (fileIndex !== -1) {
        files[fileIndex] = reqBody;
    }
    res.send(files)
});

app.put('')
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})