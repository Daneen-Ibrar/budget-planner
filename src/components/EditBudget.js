import React, { useState } from 'react';

const EditBudget = ({ handleSaveClick, budget }) => {
	const [editedBudget, setEditedBudget] = useState(budget);

	const handleInputChange = (e) => {
		setEditedBudget(e.target.value);
	};

	const handleSave = () => {
		handleSaveClick(parseFloat(editedBudget));
	};

	return (
		<>
			<input
				type="number"
				className="form-control"
				value={editedBudget}
				onChange={handleInputChange}
			/>
			<button className="btn btn-primary" onClick={handleSave}>
				Save
			</button>
		</>
	);
};

export default EditBudget;
