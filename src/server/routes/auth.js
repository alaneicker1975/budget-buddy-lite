const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-node');
const User = require('../schemas/auth');

const router = express.Router();

router.post('/authenticate', async (req, res) => {
  try {
    const {
      body: { username, password },
    } = req;

    const user = await User.findOne({ username });

    const isValidUser = bcrypt.compareSync(password, user.password);

    if (!isValidUser) {
      res.status(401).send({ err: 'Invalid username or password' });
      return;
    }

    const token = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.cookie('token', token, { httpOnly: true });
    res.status(200).send({});
  } catch (err) {
    res.status(500).send({ err: 'Invalid username or password' });
  }
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
