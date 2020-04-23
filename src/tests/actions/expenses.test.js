import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

// // TEST addExpense() - default values
// test('should setup add expense action object with default values', () => {
// 	const action = addExpense();
// 	expect(action).toEqual({
// 		type: 'ADD_EXPENSE',
// 		expense: {
// 			id: expect.any(String),
// 			description: '',
// 			notes: '',
// 			amount: 0,
// 			createdAt: 0
// 		}
// 	})
// });

// TEST addExpense() - provided values
test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore({});
	const data = {
		description: "Trackpad",
		amount: 5000,
		notes: '',
		createdAt: 1000
	};

	store.dispatch(startAddExpense(data)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...data
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(data);
		done();
	});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore({});
	const data = {
		description: '',
		amount: 0,
		notes: '',
		createdAt: 0
	}

	store.dispatch(startAddExpense({})).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...data
			}
		});

		return database.ref(`expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(data);
		done();
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