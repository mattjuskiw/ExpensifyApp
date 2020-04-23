import { v4 as uuid } from 'uuid';
import database from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => ({
	type: 'ADD_EXPENSE',
	expense
});

export const startAddExpense = (data = {}) => {
	return (dispatch) => {
		const {
			description = '', 
			notes = '', 
			amount = 0, 
			createdAt = 0 
		} = data;

		const expense = { description, notes, amount, createdAt }

		database.ref('expenses').push(expense).then((ref) => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}));
		});
	};
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
});

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
});