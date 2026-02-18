import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
{
  type: "cash_in" | "cash_out",
  source: "collection" | "loan" | "expense" | "investment",
  amount: Number,
  referenceId: ObjectId,
  note: String,
  date: Date
}
);
export default mongoose.model("Transaction", transactionSchema);
