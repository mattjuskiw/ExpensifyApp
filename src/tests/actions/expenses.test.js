import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
	addExpense, 
	editExpense, 
	removeExpense, 
	startAddExpense, 
	startEditExpense,
	startRemoveExpense,
	startSetExpenses, 
	setExpenses 
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'testUID';
const testAuthState = { auth: { uid }};
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const data = {};
	expenses.forEach(({ id, description, notes, amount, createdAt }) => {
		data[id] = { description, notes, amount, createdAt };
	});
	database.ref(`/users/${uid}/expenses`).set(data).then(() => done());
});

// TEST addExpense() - provided values
test('should setup add expense action object with provided values', () => {
	const action = addExpense(expenses[2]);
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	});
});

test('should add expense to database and store', (done) => {
	const store = createMockStore(testAuthState);
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

		return database.ref(`/users/${uid}/expenses/${actions[0].expense.id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(data);
		done();
	});
});

test('should add expense with defaults to database and store', (done) => {
	const store = createMockStore(testAuthState);
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

		return database.ref(`/users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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

test('should edit expense from firebase', (done) => {
	const store = createMockStore(testAuthState);
	const id = expenses[0].id;
	const updates = {
		amount: 21045
	};
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'EDIT_EXPENSE',
			id,
			updates
		});

		return database.ref(`/users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val().amount).toBe(updates.amount);
		done();
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

test('should remove expense from firebase', (done) => {
	const store = createMockStore(testAuthState);
	const id = expenses[2].id;
	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		});
		return database.ref(`/users/${uid}/expenses/${id}`).once('value');
	}).then((snapshot) => {
		expect(snapshot.val()).toBeFalsy();
		done();
	});
});

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	});
});

test('should fetch expenses from firebase', (done) => {
	const store = createMockStore(testAuthState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		});
		done();
	});
});