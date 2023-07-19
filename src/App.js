import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { AppProvider } from './context/AppContext';
import Budget from './components/Budget';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import RemainingBudget from './components/Remaining';

const App = () => {
  return (
    <AppProvider>
      <div className='container'>
        <h1 className='mt-3'>My Budget Planner</h1>
        <div className='row mt-4'>
          <div className='col-sm'>
            <Budget />
          </div>
          <div className='col-sm'>
            <RemainingBudget />
          </div>
          <div className='col-sm'>
            <ExpenseTotal />
          </div>
        </div>
        <h3 className='mt-3'>Expenses</h3>
        <div className='row'>
          <div className='col-sm'>
            <ExpenseList />
          </div>
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
