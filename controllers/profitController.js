import Investment from "../models/Investment.js";
import Expense from "../models/Expense.js";
import Collection from "../models/Collection.js";
import Loan from "../models/Loan.js";

export const allocateProfit = async (req, res) => {
  try {
    const { reinvestAmount, expenseAmount, note } = req.body;

    const reinvest = Number(reinvestAmount) || 0;
    const expense = Number(expenseAmount) || 0;

    // 🔹 calculate available profit
    const collections = await Collection.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const loans = await Loan.aggregate([
      { $group: { _id: null, total: { $sum: "$disbursedAmount" } } }
    ]);

    const totalCollection = collections[0]?.total || 0;
    const totalDisbursed = loans[0]?.total || 0;

    const availableProfit = totalCollection - totalDisbursed;

    if (reinvest + expense > availableProfit) {
      return res.status(400).json({
        message: "Allocation exceeds available profit"
      });
    }

    // ✅ Save reinvestment
    if (reinvest > 0) {
      await Investment.create({
        amount: reinvest,
        source: "reinvest_profit",
        note
      });
    }

    // ✅ Save expense
    if (expense > 0) {
      await Expense.create({
        amount: expense,
        note: note || "Profit allocation expense"
      });
    }

    res.json({ message: "Profit allocated successfully" });

  } catch (error) {
    res.status(500).json({ message: "Allocation failed" });
  }
};
