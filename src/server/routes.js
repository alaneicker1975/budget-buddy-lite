const express = require('express');
const fs = require('file-system');
const jwt = require('jsonwebtoken');
const passwordHash = require('bcrypt-node');

const router = express.Router();

router.post('/authenticate', (req, res) => {
  const { body } = req;
  const isValidPin = passwordHash.compareSync(body.pin, process.env.USER_PIN);

  if (!isValidPin) {
    res.status(500).send({ err: 'Login Error: Invalid PIN' });
  }

  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('token', token, { httpOnly: true });
  res.status(200).send({});
});

router.get('/verify-user', (req, res) => {
  const {
    cookies: { token },
  } = req;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    res.send({
      isValid: !(error || decoded === undefined),
    });
  });
});

router.delete('/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ isLoggedOut: true });
});

router.get('/expenses', (req, res) => {
  fs.readFile(`${process.cwd()}/src/server/data.json`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.json([]);
      return;
    }
    res.json(JSON.parse(data));
  });
});

router.post('/expenses', (req, res) => {
  const { body } = req;
  fs.writeFile(
    `${process.cwd()}/src/server/data.json`,
    JSON.stringify(body, null, 2),
    (err) => {
      if (err) {
        res.json({ err: 'ERROR: Could not save' });
      }
      res.json({});
    },
  );
});

module.exports = router;
