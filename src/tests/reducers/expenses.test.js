import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

// TEST: default
test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

// TEST: ADD_EXPENSE
test('should add expense', () => {
	const expense = {
		id: '109',
		description: 'Laptop',
		notes: '',
		createdAt: 2000,
		amount: 29500
	};
	const action = {
		type: 'ADD_EXPENSE',
		expense
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([...expenses, expense]);
});

// TEST: EDIT_EXPENSE
test('should edit expense by id', () => {
	const amount = 95;
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			amount
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state[0].amount).toBe(amount);
});

// TEST: EDIT_EXPENSE (id not found)
test('should not edit expense due to unfound id', () => {
	const amount = 95;
	const action = {
		type: 'EDIT_EXPENSE',
		id: '-1',
		updates: {
			amount
		}
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});

// TEST: REMOVE_EXPENSE
test('should remove expense by id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: expenses[0].id
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual([
		expenses[1],
		expenses[2]
	]);
});

// TEST: REMOVE_EXPENSE (id not found)
test('should not remove expense due to unfound id', () => {
	const action = {
		type: 'REMOVE_EXPENSE',
		id: '-1'
	};
	const state = expensesReducer(expenses, action);
	expect(state).toEqual(expenses);
});