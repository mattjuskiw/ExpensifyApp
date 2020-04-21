import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

// TEST addExpense() - default values
test('should setup add expense action object with default values', () => {
	const action = addExpense();
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: '',
			notes: '',
			amount: 0,
			createdAt: 0
		}
	})
});

// TEST addExpense() - provided values
test('should setup add expense action object with provided values', () => {
	const expenseData = {
		description: 'rent'	,
		amount: 109500,
		createdAt: 1000,
		notes: 'This was last months rent'
	};
	const action = addExpense(expenseData);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String)
		}
	});
});

// TEST editExpense()
test('Should setup edit expense action object', () => {
	const action = editExpense('123abc', { notes: 'New note value' });
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			notes: 'New note value'
		}
	});
});

// TEST removeExpense()
test('Should setup remove expense action object', () => {
	const action = removeExpense({ id: '123abc' });
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	});
});