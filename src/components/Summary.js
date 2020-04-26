import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import visibleExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

export const Summary = ({ count, total }) => {
	const word = count === 1 ? 'expense' : 'expenses';
	const formattedTotal = numeral(total).format('$0,0.00');

	return (
		<div className="page-header">
			<div className="container">

				<h1 className="page-header__title">
					Viewing <span>{count}</span> {word}, totalling <span>{formattedTotal}</span>
				</h1>

				<div className="page-header__actions">
					<Link className="button" to="/create">Add Expense</Link>
				</div>
				
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	const visible = visibleExpenses(state.expenses, state.filters);

	return {
		count: visible.length,
		total: expensesTotal(visible)
	};
};

export default connect(mapStateToProps)(Summary);