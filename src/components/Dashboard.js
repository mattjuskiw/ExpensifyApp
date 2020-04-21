import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import Summary from './Summary';

const Dashboard = () => (
	<div>
		<Summary />
		<ExpenseListFilters />
		<ExpenseList />
	</div>
);

export default Dashboard;