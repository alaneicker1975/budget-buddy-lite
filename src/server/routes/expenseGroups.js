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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expenseGroup = await ExpenseGroup.find({ _id: id });
    res.status(201).send({ data: expenseGroup });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { body } = req;
    const expenseGroup = await new ExpenseGroup(body).save();
    res.status(201).send({ expenseGroup });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
});

router.patch('/update/:id', (req, res) => {});

router.delete('/delete/:id', (req, res) => {});

module.exports = router;
