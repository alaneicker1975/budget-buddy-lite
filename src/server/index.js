/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('file-system');
const path = require('path');

const port = process.env.port || 9000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/api/expenses', (req, res) => {
  const { body } = req;
  fs.writeFile(
    `${process.cwd()}/static/data.json`,
    JSON.stringify(body, null, 2),
    (err) => {
      if (err) {
        res.json({ status: 500 });
      }
      res.json({ status: 200 });
    },
  );
});

app.listen(port, () => {
  console.log('Server running on port:', port);
});
