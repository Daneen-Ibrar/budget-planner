import React, { useContext, useState, useEffect } from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
import { TiPlus } from 'react-icons/ti';

const ExpenseList = () => {
  const { expenses, dispatch } = useContext(AppContext);
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };

  const handleAddExpense = () => {
    const newExpense = {
      id: Date.now().toString(),
      name: 'New Expense',
      cost: 0,
    };
    const updatedExpenses = [...expenses, newExpense];
    dispatch({ type: 'SET_EXPENSES', payload: updatedExpenses });
  };

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    dispatch({ type: 'SET_EXPENSES', payload: savedExpenses });
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    setFilteredExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    const filteredExpenses = expenses.filter((expense) =>
      expense.name.toLowerCase().includes(searchTerm)
    );
    setFilteredExpenses(filteredExpenses);
  }, [expenses, searchTerm]);

  return (
    <div>
      <input
        type='text'
        className='form-control mb-2 mr-sm-2'
        placeholder='Type to search...'
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={handleAddExpense} className='btn btn-primary '>Add Expense <TiPlus size="1.5em"/></button>
      <ul className='list-group mt-3'>
        {filteredExpenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;

