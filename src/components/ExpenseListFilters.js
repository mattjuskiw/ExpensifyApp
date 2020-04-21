import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { setEndDate, setStartDate, setTextFilter, sortByAmount, sortByDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	};

	changeDates = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};

	changeFocus = (calendarFocused) => {
		this.setState(() => ({ calendarFocused }));
	};

	changeSort = (e) => {
		if(e.target.value === 'date')
			this.props.sortByDate();
		else if(e.target.value === 'amount') 
			this.props.sortByAmount();
	};

	changeText = (e) => {
		this.props.setTextFilter(e.target.value);
	};

	render() {
		return (
			<div>
				<input 
					type="text" 
					value={this.props.filters.text} 
					onChange={this.changeText} 
				/>
			
				<select
					value={this.props.filters.sortBy}
					onChange={this.changeSort}
				>
					<option value='date'>Date</option>
					<option value='amount'>Amount</option>
				</select>

				<DateRangePicker 
					startDateId={"dwjkhqkehwqjkeq"}
					endDateId={"cxzvcxbzbczxbz"}
					startDate={this.props.filters.startDate}
					endDate={this.props.filters.endDate}
					onDatesChange={this.changeDates}
					focusedInput={this.state.calendarFocused}
					onFocusChange={this.changeFocus}
					showClearDates={true}
					numberOfMonths={1}
					isOutsideRange={() => false}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
	setEndDate: (endDate) => dispatch(setEndDate(endDate)),
	setStartDate: (startDate) => dispatch(setStartDate(startDate)),
	setTextFilter: (text) => dispatch(setTextFilter(text)),
	sortByAmount: () => dispatch(sortByAmount()),
	sortByDate: () => dispatch(sortByDate())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);