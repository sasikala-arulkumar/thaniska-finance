import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    loanNo: {
      type: String,
      required: true
    },

    partyName: {
      type: String,
      required: true
    },

    amount: {
      type: Number,
      required: true
    },
     principalPaid: Number, // principal portion
  interestPaid: Number,

    date: {
      type: Date,
      required: true
    },

    collectionType: {
      type: String,
      enum: ["daily", "weekly", "monthly", "fire", "fixed"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Collection", collectionSchema);
