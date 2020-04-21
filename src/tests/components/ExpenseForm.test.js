import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

// function setWrapper()
const setWrapper = (input, value, index) => {
	const wrapper = shallow(<ExpenseForm />);
	if(index) {
		wrapper.find(input).at(index).simulate('change', {
			target: { value }
		});
	} else {
		wrapper.find(input).simulate('change', {
			target: { value }
		});
	}
	return wrapper;
};

// TEST: Rendering (no data)
test('should render ExpenseForm correctly', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

// TEST: Rendering (fixture data)
test('should render ExpenseForm with fixture data', () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
	expect(wrapper).toMatchSnapshot();
});

// TEST: Rendering (invalid error)
test('should render error for invalid form submission', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();

	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('error').length).toBeGreaterThan(0);
	expect(wrapper).toMatchSnapshot();
});

// TEST: changeAmount()
test('should set amount on amount change', () => {
	const value = "23.50";
	const wrapper = setWrapper('input', value, 1);
	expect(wrapper.state('amount')).toBe(value);
});

// TEST: changeAmount() (invalid amount)
test('should not set amount for invalid input', () => {
	const value = "12.122";
	const wrapper = setWrapper('input', value, 1);
	expect(wrapper.state('amount')).toBe('');
});

// TEST: changeDate()
test('should set new date on date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

// TEST: changeDescription()
test('should set description on input change', () => {
	const value = 'New description';
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	// DOESN'T WORK (I don't know why):
	// const wrapper = setWrapper('input', value, 0);
	expect(wrapper.state('description')).toBe(value);
});

// TEST: changeFocus()
test('should set calendar focus on change', () => {
	const focused = true;
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused);
});

// TEST: changeNotes()
test('should set note on textarea change', () => {
	const value = "New note";
	const wrapper = setWrapper('textarea', value);
	expect(wrapper.state('notes')).toBe(value);
});

// TEST: Submit valid form
test('should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('error')).toBe('');
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		notes: expenses[0].notes,
		createdAt: expenses[0].createdAt
	});
});