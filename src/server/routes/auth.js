const express = require('express');
const jwt = require('jsonwebtoken');
const passwordHash = require('bcrypt-node');

const router = express.Router();

router.post('/authenticate', (req, res) => {
  const { body } = req;
  const isValidPin = passwordHash.compareSync(body.pin, process.env.USER_PIN);

  if (!isValidPin) {
    res.status(401).send({ err: 'Login Error: Invalid PIN' });
    return;
  }

  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('token', token, { httpOnly: true });
  res.status(200).send({});
});

router.get('/verify-token', (req, res) => {
  const {
    cookies: { token },
  } = req;

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    const isValid = !(error || decoded === undefined);
    res.send({ isValid });
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.send({ isLoggedOut: true });
});

module.exports = router;
