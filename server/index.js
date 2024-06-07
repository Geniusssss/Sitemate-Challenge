const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, 'issues.json');

const readDataFromFile = () => {
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
};

const writeDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get('/issues', (req, res) => {
    const issues = readDataFromFile();
    res.json(issues);
});

app.post('/issues', (req, res) => {
    const newIssue = req.body;
    const issues = readDataFromFile();
    issues.push(newIssue);
    writeDataToFile(issues);
    console.log('Issue created:', newIssue);
    res.status(201).json(newIssue);
});

app.put('/issues/:id', (req, res) => {
    const { id } = req.params;
    const updatedIssue = req.body;
    const issues = readDataFromFile();
    const index = issues.findIndex(issue => issue.id === id);
    if (index !== -1) {
        issues[index] = { ...issues[index], ...updatedIssue };
        writeDataToFile(issues);
        console.log('Issue updated:', issues[index]);
        res.json(issues[index]);
    } else {
        res.status(404).send('Issue not found');
    }
});

app.delete('/issues/:id', (req, res) => {
    const { id } = req.params;
    const issues = readDataFromFile();
    const index = issues.findIndex(issue => issue.id === id);
    if (index !== -1) {
        const deletedIssue = issues.splice(index, 1);
        writeDataToFile(issues);
        console.log('Issue deleted:', deletedIssue[0]);
        res.json(deletedIssue[0]);
    } else {
        res.status(404).send('Issue not found');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});