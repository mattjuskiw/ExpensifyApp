import React from 'react';
import { connect } from 'react-redux';

import ExpenseListItem from './ExpenseListItem';

import visibleExpenses from '../selectors/expenses';

export const ExpenseList = (props) => (
	<div className="container">
		<div className="list-header">
			<div className="show-mobile">Expenses</div>
			<div className="show-desktop">Expense</div>
			<div className="show-desktop">Amount</div>
		</div>

		<div className="list-body">
			{
				props.expenses.length === 0 ? (
					<div className="list-item list-item--message">
						<span>No expenses</span>
					</div>
				) : (
					<span>
						{props.expenses.map((expense, index) => {
							return (
								<ExpenseListItem key={index} {...expense} />
							)
						})}
					</span>
				)
			}
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		expenses: visibleExpenses(state.expenses, state.filters)
	};
};

export default connect(mapStateToProps)(ExpenseList);
