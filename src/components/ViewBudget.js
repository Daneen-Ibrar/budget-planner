import React from 'react';

const ViewBudget = ({ handleEditClick, budget }) => {
	return (
		<>
			<span className="mr-3">Budget: £{budget}</span>
			<button className="btn btn-primary" onClick={handleEditClick}>
				Edit
			</button>
		</>
	);
};

export default ViewBudget;
