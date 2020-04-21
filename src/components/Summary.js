import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import visibleExpenses from '../selectors/expenses';
import expensesTotal from '../selectors/expenses-total';

export const Summary = ({ count, total }) => {
	const word = count === 1 ? 'expense' : 'expenses';
	const formattedTotal = numeral(total).format('$0,0.00');

	return (
		<div>
			<h1>
				Viewing {count} {word}, totalling {formattedTotal}
			</h1>
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