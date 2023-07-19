import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CurrencySelector from './CurrencySelector';

const Budget = () => {
  const { budget, currency, dispatch } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBudget, setEditedBudget] = useState(budget);

  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    const savedCurrency = localStorage.getItem('currency');
    if (savedBudget) {
      setEditedBudget(parseFloat(savedBudget));
      dispatch({
        type: 'SET_BUDGET',
        payload: parseFloat(savedBudget),
      });
    }
    if (savedCurrency) {
      dispatch({
        type: 'SET_CURRENCY',
        payload: savedCurrency,
      });
    }
  }, [dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    let updatedBudget = parseFloat(editedBudget);
    if (isNaN(updatedBudget)) {
      updatedBudget = 0;
    }
    localStorage.setItem('budget', updatedBudget.toString());
    dispatch({
      type: 'SET_BUDGET',
      payload: updatedBudget,
    });
    setIsEditing(false);
  };

  const handleCurrencyChange = (selectedCurrency) => {
    localStorage.setItem('currency', selectedCurrency);
    dispatch({
      type: 'SET_CURRENCY',
      payload: selectedCurrency,
    });
  };

  return (
    <div className="border border-secondary alert alert-light p-3 d-flex align-items-center justify-content-between">
      {isEditing ? (
        <>
          <CurrencySelector
            selectedCurrency={currency}
            onCurrencyChange={handleCurrencyChange}
          />
          <input
            type="number"
            className="form-control"
            value={editedBudget}
            onChange={(e) => setEditedBudget(parseFloat(e.target.value))}
          />
          <button className="btn btn-primary" onClick={handleSaveClick}>
            Save
          </button>
        </>
      ) : (
        <>
          <span className="mr-3">
            Budget: {currency}
            {budget}
          </span>
          <button className="btn btn-primary" onClick={handleEditClick}>
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Budget;
