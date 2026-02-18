export const calculateInterest = ({
  amount,
  rate,
  duration,
  type
}) => {
  let interest = 0;

  switch (type) {
    case 'daily':
      interest = amount * (rate / 100) * (duration * 30);
      break;
    case 'weekly':
      interest = amount * (rate / 100) * (duration * 4);
      break;
    case 'monthly':
      interest = amount * (rate / 100) * duration;
      break;
    case 'flat':
      interest = amount * (rate / 100);
      break;
    case 'fir':
      interest = (amount * rate * duration) / 100;
      break;
  }

  const totalPayable = amount + interest;
  const emi = totalPayable / duration;

  return { totalPayable, emi };
};
