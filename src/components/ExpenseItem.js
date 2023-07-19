import React, { useContext, useState } from 'react';
import { TiDelete, TiPencil, TiPlus } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';

const ExpenseItem = ({ expense }) => {
  const { currency, dispatch } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(expense.name);
  const [editedCost, setEditedCost] = useState(expense.cost.toString());

  const handleDeleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: expense.id,
    });
  };

  const handleEditExpense = () => {
    setIsEditing(true);
  };

  const handleSaveExpense = () => {
    dispatch({
      type: 'EDIT_EXPENSE',
      payload: {
        id: expense.id,
        name: editedName,
        cost: parseFloat(editedCost),
      },
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(expense.name);
    setEditedCost(expense.cost.toString());
  };

  return (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      {isEditing ? (
        <>
          <input
            type='text'
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className='border border-primary rounded-2 p-1 d-inline-flex focus-ring text-decoration-none rounded-2'
          />
          <TiPlus size='1em' />
          <input
            type='text'
            value={editedCost}
            className='border border-primary rounded-2 p-1 d-inline-flex focus-ring text-decoration-none rounded-2'
            onChange={(e) => setEditedCost(e.target.value)}
          />
          <button onClick={handleSaveExpense} className="badge bg-primary border border-primary">Save</button>
          <button onClick={handleCancelEdit} className="badge bg-primary border border-primary">Cancel</button>
        </>
      ) : (
        <>
          <span>{expense.name}</span>
          <span className='badge bg-primary mr-2'>
            {currency}
            {expense.cost.toFixed(2)}
          </span>
          <TiPencil className="badge bg-primary" size='2.5em' onClick={handleEditExpense} />
          <TiDelete size='1.5em' onClick={handleDeleteExpense} />
        </>
      )}
    </li>
  );
};

export default ExpenseItem;
