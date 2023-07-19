import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const RemainingBudget = () => {
  const { expenses, budget, currency } = useContext(AppContext);

  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.cost);
  }, 0);

  const remainingBudget = budget - totalExpenses;

  const alertType =
    totalExpenses > budget ? 'border border-danger alert alert-light' : 'border border-success alert alert-light';

  return (
    <div className={`alert p-4 ${alertType}`}>
      <span>Remaining: {currency}{remainingBudget}</span>
    </div>
  );
};

export default RemainingBudget;
