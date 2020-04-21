import moment from 'moment';
import filtersReducer from '../../reducers/filters';

// TEST: default filter values
test('should setup default filter values', () => {
	const state = filtersReducer(undefined, { type: '@@INIT' });
	expect(state).toEqual({
		text: '',
		sortBy: 'date',
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	});
});

// TEST: SET_END_DATE_FILTER
test('should set end date filter', () => {
	const endDate = moment();
	const action = {
		type: 'SET_END_DATE_FILTER',
		endDate
	};
	const state = filtersReducer(undefined, action);
	expect(state.endDate).toEqual(endDate);
});

// TEST: SET_START_DATE_FILTER
test('should set start date filter', () => {
	const startDate = moment();
	const action = {
		type: 'SET_START_DATE_FILTER',
		startDate
	};
	const state = filtersReducer(undefined, action);
	expect(state.startDate).toEqual(startDate);
});

// TEST: SET_TEXT_FILTER
test('should set text filter', () => {
	const text = "This is the filter.";
	const action = {
		type: 'SET_TEXT_FILTER',
		text
	};
	const state = filtersReducer(undefined, action);
	expect(state.text).toBe(text);
});

// TEST: SORT_BY_AMOUNT sets filters.sortBy to 'amount'
test('should set sortBy to amount', () => {
	const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
	expect(state.sortBy).toBe('amount');
});

// TEST: SORT_BY_DATE sets filters.sortBy to 'date'
test('should set sortBy to date', () => {
	const currentState = {
		text: '',
		startDate: undefined,
		endDate: undefined,
		sortBy: 'amount'
	};
	const action = { type: 'SORT_BY_DATE' };
	const state = filtersReducer(currentState, action);
	expect(state.sortBy).toBe('date');
});