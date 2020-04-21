import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			description: props.expense ? props.expense.description : '',
			notes: props.expense ? props.expense.notes : "",
			amount: props.expense ? (props.expense.amount / 100).toFixed(2).toString() : '',
			createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			error: ''
		};
	}


	changeDescription = (e) => {
		const description = e.target.value;
		this.setState(() => ({ description }));
	};

	changeAmount = (e) => {
		const amount = e.target.value;
		if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/))
			this.setState(() => ({ amount }));
	};

	changeDate = (createdAt) => {
		if(createdAt)
			this.setState(() => ({ createdAt }));
	};

	changeFocus = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }));
	};

	changeNotes = (e) => {
		const notes = e.target.value;
		this.setState(() => ({ notes }));
	};

	submitNewExpense = (e) => {
		e.preventDefault();
		if(!this.state.description || !this.state.amount) {
			this.setState(() => ({
				error: 'Please provide description and amount.'
			}));
		} else {
			this.setState(() => ({
				error: ''
			}));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				notes: this.state.notes
			});
		}
	};

	render() {
		return (
			<div>
				{this.state.error && 
					<p>{this.state.error}</p>
				}
				<form onSubmit={this.submitNewExpense}>
					<input 
						type='text'
						placeholder='Description'
						autoFocus
						value={this.state.description}
						onChange={this.changeDescription}
					/>

					<input
						type='text'
						placeholder='Amount'
						value={this.state.amount}
						onChange={this.changeAmount}
					/>

					<SingleDatePicker 
						date={this.state.createdAt}
						onDateChange={this.changeDate}
						focused={this.state.calendarFocused}
						onFocusChange={this.changeFocus}
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>

					<textarea 
						placeholder='Add a note for your expense (optional)'
						value={this.state.notes}
						onChange={this.changeNotes}
					>
					</textarea>

					<button>
						{this.props.expense ? 'Edit Expense' : 'Add Expense'}
					</button>
				</form>
			</div>
		);
	}
}