import React, { createContext, useReducer, useEffect } from 'react';

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      // Generate a unique ID for the new expense
      const newExpense = { ...action.payload, id: Date.now() };
      return {
        ...state,
        expenses: [...state.expenses, newExpense],
      };
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.payload),
      };
    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload,
      };
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload,
      };
    case 'EDIT_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map((expense) => {
          if (expense.id === action.payload.id) {
            return {
              ...expense,
              name: action.payload.name,
              cost: action.payload.cost,
            };
          }
          return expense;
        }),
      };
    case 'SET_EXPENSES':
      return {
        ...state,
        expenses: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  budget: 0,
  expenses: [],
  currency: '£',
};

export const AppContext = createContext(initialState);
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    // Set expenses from localStorage before the initial render
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    return { ...initialState, expenses: savedExpenses };
  });

  // ... Save expenses, budget, and currency in local storage ...

  useEffect(() => {
    // Save expenses in local storage whenever it changes
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);


  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
    localStorage.setItem('budget', state.budget.toString()); // Save budget in localStorage whenever it changes.
    localStorage.setItem('currency', state.currency); // Save currency in localStorage whenever it changes.
  }, [state.expenses, state.budget, state.currency]);

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    dispatch({ type: 'SET_EXPENSES', payload: savedExpenses });

    const savedBudget = localStorage.getItem('budget');
    if (savedBudget) {
      dispatch({
        type: 'SET_BUDGET',
        payload: parseFloat(savedBudget),
      });
    }

    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      dispatch({
        type: 'SET_CURRENCY',
        payload: savedCurrency,
      });
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
  }, [state.budget]);

  useEffect(() => {
    localStorage.setItem('currency', state.currency);
  }, [state.currency]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
