const express = require('express');
const ExpenseGroup = require('../schemas/expenseGroups');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const expenseGroups = await ExpenseGroup.find({});
    res.status(201).send({ data: expenseGroups });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.get('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const expenseGroup = await ExpenseGroup.findOne({ _id });
    res.status(201).send({ data: expenseGroup });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { body } = req;
    const expenseGroup = await new ExpenseGroup(body).save();
    res.status(201).send({ expenseGroup });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.patch('/:_id', async (req, res) => {});

router.delete('/:_id', async (req, res) => {
  try {
    const { _id } = req.params;
    const { deletedCount } = await ExpenseGroup.deleteOne({ _id });
    res.status(200).send({ deletedId: deletedCount !== 0 ? _id : null });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

module.exports = router;
