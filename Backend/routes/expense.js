const express = require("express");
const expense = require("../Models/expense");
const router = express.Router();

// ADD EXPENSE

router.post("/", async (req, res) => {
  const newExpense = expense(req.body);
  try {
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL EXPENSES

router.get("/", async (req, res) => {
  try {
    const expenses = await expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE EXPENSES

router.put("/:id", async (req, res) => {
  try {
    const expense = await expense.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE EXPENSE

router.delete("/:id", async(req, res) => {
  try {

    await expense.findByIdAndDelete(req.params.id);
    res.status(201).json("expense has been successfully deleted")
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;