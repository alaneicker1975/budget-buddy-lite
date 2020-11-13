/* eslint-disable global-require */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('file-system');

const port = process.env.port || 9000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

app.get('/api/expenses', (req, res) => {
  fs.readFile(`${process.cwd()}/src/server/data.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
      return;
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/expenses', (req, res) => {
  const { body } = req;
  fs.writeFile(
    `${process.cwd()}/src/server/data.json`,
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
