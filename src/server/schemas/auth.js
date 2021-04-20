const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const User = model(
  'Users',
  new Schema({
    username: String,
    password: String,
  }),
);

module.exports = User;
