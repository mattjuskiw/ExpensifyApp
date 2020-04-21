import moment from 'moment';
import visibleExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

// TEST: Filter by endDate
test('should filter by endDate', () => {
	const result = testFilter({ endDate: moment(0) });
	expect(result).toEqual([
		expenses[0],
		expenses[1]
	])
});

// TEST: Filter by startDate
test('should filter by startDate', () => {
	const result = testFilter({ startDate: moment(0) });
	expect(result).toEqual([
		expenses[2],
		expenses[0]
	]);
});

// TEST: Filter by text
test('should filter by text value', () => {
	const result = testFilter({ text: 'e' });
	expect(result).toEqual([
		expenses[2],
		expenses[1]
	]);
});

// TEST: Sort by amount
test('should sort by amount', () => {
	const result = testFilter({ sortBy: 'amount' });
	expect(result).toEqual([
		expenses[1],
		expenses[2],
		expenses[0]
	]);
});

// TEST: Sort by date
test('should sort by date', () => {
	const result = testFilter({});
	expect(result).toEqual([
		expenses[2],
		expenses[0],
		expenses[1]
	]);
});

// function testFilter()
const testFilter = ({ text = '', sortBy = 'date', startDate = undefined, endDate = undefined }) => {
	return visibleExpenses(expenses, {text, sortBy, startDate, endDate});
};