/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = process.env.port || 9000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/expenses', (req, res) => {
  const { body } = req;
  try {
    fs.writeFileSync('../data.json', body, {
      encoding: 'utf8',
      flag: 'w',
    });
    res.send({ status: 200 });
  } catch (err) {
    console.log(err);
    res.send({ status: 500 });
  }
});

app.listen(port, () => {
  console.log('Server running on port:', port);
});
