const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ExpenseGroup = model(
  'ExpenseGroups',
  new Schema({
    title: String,
    totalBudget: Number,
    expenses: [
      {
        title: String,
        balance: Number,
        paid: Boolean,
      },
    ],
  }),
);

module.exports = ExpenseGroup;
