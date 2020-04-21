import moment from 'moment';
import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from '../../actions/filters';

// TEST setEndDate()
test('should generate setEndDate action object', () => {
	const action = setEndDate(moment(0));
	expect(action).toEqual({
		type: 'SET_END_DATE_FILTER',
		endDate: moment(0)
	});
});

// TEST setStartDate()
test('should generate setStartDate action object', () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: 'SET_START_DATE_FILTER',
		startDate: moment(0)
	});
});

// TEST setTextFilter() - default value
test('should generate setTextFilter action object with default value', () => {
	expect(setTextFilter()).toEqual({
		type: 'SET_TEXT_FILTER',
		text: ''
	});
});

// TEST setTextFilter() - provided text value
test('should generate setTextFilter action object with text value', () => {
	const text = 'Something'
	const action = setTextFilter(text);
	expect(action).toEqual({
		type: 'SET_TEXT_FILTER',
		text
	});
});

// TEST sortByAmount()
test('should generate sortByAmount action object', () => {
	expect(sortByAmount()).toEqual({
		type: 'SORT_BY_AMOUNT'
	});
});

// TEST sortByDate()
test('should generate sortByDate action object', () => {
	expect(sortByDate()).toEqual({
		type: 'SORT_BY_DATE'
	});
});