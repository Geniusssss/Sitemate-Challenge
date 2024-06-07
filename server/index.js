const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, '/data/issues.json');

const readDataFromFile = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

app.get('/issues', (req, res) => {
  const issues = readDataFromFile();
  res.json(issues);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});