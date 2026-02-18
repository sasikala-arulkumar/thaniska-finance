import Loan from "../models/Loan.js";

// CREATE LOAN
// export const createLoan = async (req, res) => {
//   try {
//     const loan = await Loan.create(req.body);
//     res.status(201).json(loan);
//   } catch (error) {
//     console.error("CREATE LOAN ERROR:", err.message);
//     res.status(500).json({ message: error.message });
//   }
// };

// export const createLoan = async (req, res) => {
//   try {
//     const {
//   partyName,
//   fatherName,
//   age,
//   occupation,
//   address,
//   mobile,
//   aadhar,
//   witnessMobile,
//   amount,
//   date,
//   collectionType,
//   duration,
//   interestRate,
// } = req.body;


//     const totalInterest = (amount * interestRate) / 100;
// const totalPayable = amount + totalInterest;


//     const installmentAmount = totalPayable / duration;

//     const loanNumber = "LN" + Date.now();

//     const loan = await Loan.create({
    
//       partyName,
//       amount,
//       interestRate,
//       duration,
//       collectionType,
//       totalInterest,
//       totalPayable,
//       installmentAmount,
//     });

//     res.status(201).json(loan);
//   } catch (error) {
//     res.status(500).json({ message: "Loan creation failed" });
//   }
// };

// export const createLoan = async (req, res) => {
//   try {
//     const {
//       loanNumber,
//       partyName,
//       fatherName,
//       age,
//       occupation,
//       address,
//       mobile,
//       aadhar,
//       witnessMobile,
//       amount,
//       date,
//       collectionType,
//       duration,
//       interestRate,
//     } = req.body;

//     // Convert to numbers (backend safety)
//     const loanAmount = Number(amount);
//     const rate = Number(interestRate);
//     const loanDuration = Number(duration);

//     if (!loanAmount || !rate || !loanDuration) {
//       return res.status(400).json({ message: "Invalid numeric values" });
//     }

//     const totalInterest = ((loanAmount * rate) / 100);
//     const totalPayable = loanAmount + totalInterest;
//     const installmentAmount = totalPayable / loanDuration;

//     // const loanNumber = "LN" + Date.now();

//     const finalLoanNumber =
//       loanNumber && loanNumber.trim() !== ""
//         ? loanNumber
//         : undefined;

//     const loan = await Loan.create({
//       loanNumber: finalLoanNumber,
//       partyName,
//       fatherName,
//       age,
//       occupation,
//       address,
//       mobile,
//       aadhar,
//       witnessMobile,
//       amount: loanAmount,
//       interestRate: rate,
//       duration: loanDuration,
//       collectionType,
//       date,
//       totalInterest,
//       totalPayable,
//       installmentAmount,
//     });

//     res.status(201).json(loan);
//   } catch (error) {
//     console.error("CREATE LOAN ERROR:", error); // 🔥 now real error will show
//     res.status(500).json({ message: error.message });
//   }
// };
export const createLoan = async (req, res) => {
  try {
    const {
      loanNumber,
      partyName,
      fatherName,
      age,
      occupation,
      address,
      mobile,
      aadhar,
      witnessMobile,
      amount,
      advanceInterest = 0,
      date,
      collectionType,
      duration,
      interestRate,
    } = req.body;

    // 🔹 Convert to numbers (backend safety)
    const loanAmount = Number(amount);
    const rate = Number(interestRate);
    const loanDuration = Number(duration);
    const advance = Number(advanceInterest);

    if (!loanAmount || !rate || !loanDuration) {
      return res.status(400).json({ message: "Invalid numeric values" });
    }

    // ✅ 1️⃣ Calculate Total Interest (based on PRINCIPAL)
    const totalInterest = ((loanAmount * rate) / 100) + advance;

    const interest = ((loanAmount * rate) / 100);

    // ✅ 2️⃣ Calculate Disbursed Amount (actual cash given)
    const disbursedAmount = loanAmount - advance;

    // ✅ 3️⃣ Total Payable (legal collection amount)
    const totalPayable = loanAmount + interest;

    // ✅ 4️⃣ Real Profit (business profit view)
    const realProfit = totalPayable - disbursedAmount;

    // ✅ 5️⃣ Installment Amount
    const installmentAmount = totalPayable / loanDuration;

    // Optional Loan Number Logic
    const finalLoanNumber =
      loanNumber && loanNumber.trim() !== ""
        ? loanNumber
        : undefined;

    const loan = await Loan.create({
      loanNumber: finalLoanNumber,
      partyName,
      fatherName,
      age,
      occupation,
      address,
      mobile,
      aadhar,
      witnessMobile,
      amount: loanAmount,
      interestRate: rate,
      duration: loanDuration,
      advanceInterest: advance,
      disbursedAmount,
      totalInterest,
      totalPayable,
      realProfit,
      installmentAmount,
      collectionType,
      date,
    });

    res.status(201).json(loan);
  } catch (error) {
    console.error("CREATE LOAN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// GET ALL LOANS
// GET /loans?collectionType=daily
// export const getLoans = async (req, res) => {
//   try {
//     const filter = {};

//     if (req.query.collectionType) {
//       filter.collectionType = req.query.collectionType;
//     }

//     const loans = await Loan.find(filter); // ✅ NO select()

//     res.json(loans);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const getLoans = async (req, res) => {
  try {
    const filter = {};

    // 🔥 make sure this matches schema field
    if (req.query.collectionType) {
      filter.collectionType = req.query.collectionType;
    }

    const loans = await Loan.find(filter).select(
      "_id loanNumber partyName amount collectionType date duration installmentAmount totalPayable principalPaid status interestRate"
    );

    res.json(loans); // ✅ return array directly
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET SINGLE LOAN
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE LOAN
export const updateLoan = async (req, res) => {
  try {
    const loan = await Loan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE LOAN
export const deleteLoan = async (req, res) => {
  try {
    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: "Loan deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
