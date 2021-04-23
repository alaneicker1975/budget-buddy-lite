const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const ExpenseSchema = new Schema(
  {
    title: String,
    balance: Number,
    paid: Boolean,
  },
  // TODO: refactor to allow updating individual expenses.
  // This will have to be removed.
  { _id: false },
);

const ExpenseGroupSchema = new Schema({
  title: String,
  totalBudget: Number,
  expenses: [ExpenseSchema],
});

const ExpenseGroup = model('ExpenseGroups', ExpenseGroupSchema);

module.exports = ExpenseGroup;
