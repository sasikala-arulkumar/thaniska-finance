import Expense from "../models/Expense.js";

// ➜ Add Expense
export const addExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Failed to add expense" });
  }
};

// ➜ Get All
export const getExpenses = async (req, res) => {
  const data = await Expense.find().sort({ date: -1 });
  res.json(data);
};

// ➜ Update
export const updateExpense = async (req, res) => {
  const updated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// ➜ Delete
export const deleteExpense = async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
