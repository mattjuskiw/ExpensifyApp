import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';

let setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate, wrapper;
beforeEach(() => {
	setEndDate = jest.fn();
	setStartDate = jest.fn();
	setTextFilter = jest.fn();
	sortByAmount = jest.fn();
	sortByDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters 
			filters={filters}
			setEndDate={setEndDate}
			setStartDate={setStartDate}
			setTextFilter={setTextFilter}
			sortByAmount={sortByAmount}
			sortByDate={sortByDate}
		/>
	);
});

// TEST: Rendering
test('should render ExpenseListFilters correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

// TEST: Rendering (Alternate filters)
test('should render ExpenseListFilters with alt data correctly', () => {
	wrapper.setProps({
		filters: altFilters
	});
	expect(wrapper).toMatchSnapshot();
});

// TEST: changeDates()
test('should handle date change', () => {
	const startDate = moment(0).add(4, 'years');
	const endDate = moment(0).add(8, 'years');
	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
	expect(setStartDate).toHaveBeenLastCalledWith(startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

// TEST: changeFocus()
test('should handle date focus change', () => {
	const calendarFocused = 'endDate';
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
	expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});

// TEST: changeSort() (amount)
test('should handle sort by amount', () => {
	const value = 'amount';
	wrapper.find('select').simulate('change', {
		target: { value }
	});
	expect(sortByAmount).toHaveBeenCalled();
});

// TEST: changeSort() (date)
test('should handle sort by date', () => {
	const value = 'date';
	wrapper.setProps({
		filters: altFilters
	});
	wrapper.find('select').simulate('change', {
		target: { value }
	});
	expect(sortByDate).toHaveBeenCalled();
});

// TEST: changeText()
test('should handle text change', () => {
	const value = 'rent';
	wrapper.find('input').simulate('change', {
		target: { value }
	});
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});