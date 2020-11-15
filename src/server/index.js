/* eslint-disable global-require */
/* eslint-disable no-console */
const dotenv = require('dotenv-flow');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('file-system');
const jwt = require('jsonwebtoken');
const passwordHash = require('bcrypt-node');
const cookieParser = require('cookie-parser');

const port = process.env.port || 9000;
const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static('dist'));

app.post('/api/authenticate', (req, res) => {
  const { body } = req;
  const isValidPin = passwordHash.compareSync(body.pin, process.env.USER_PIN);
  const privateKey = process.env.JWT_SECRET;

  if (!isValidPin) {
    res.status(500).send({ err: 'Login Error: Invalid PIN' });
  }

  const token = jwt.sign({}, privateKey, {
    expiresIn: '1h',
  });

  res.cookie('privateKey', privateKey, { httpOnly: true });
  res.cookie('token', token, { httpOnly: true });
  res.status(200).send({});
});

app.get('/api/verify-user', (req, res) => {
  const {
    cookies: { token, privateKey },
  } = req;

  jwt.verify(token, privateKey, (error, decoded) => {
    res.send({
      isValid: !(error || decoded === undefined),
    });
  });
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.clearCookie('privateKey');
  res.send({ isLoggedOut: true });
});

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
