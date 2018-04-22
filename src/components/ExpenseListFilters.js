import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter, sortByAmount,sortByDate, setStartDate, setEndDate} from '../actions/filters';

class ExpenseListFilter extends React.Component{
	state = {
		calenderfocus : null
	};

	onDatesChange = ({startDate, endDate}) => {
		this.props.dispatch(setStartDate(startDate));
		this.props.dispatch(setEndDate(endDate));
	};

	onFocusChange = (calenderfocus) => {
		this.setState(() => ({calenderfocus}));
	}

	render(){
		return(
			<div>
		   	<input type="text" value={this.props.filter.text} onChange ={(e) => {
		      this.props.dispatch(setTextFilter(e.target.value));
		   	}}/>
		   	<select value={this.props.filter.sortBy} onChange ={(e) => {
		       if(e.target.value === 'date'){ 
		        this.props.dispatch(sortByDate());
		       }else if(e.target.value === 'amount'){
		         this.props.dispatch(sortByAmount());
		       }
		   	}}>
		   	 <option value="date">Date</option>
		   	 <option value="amount">Amount</option>
		   	</select>
		   	<DateRangePicker 
		   		startDate = {this.props.filter.startDate}
		   		endDate = {this.props.filter.endDate}
		   		onDatesChange = {this.onDatesChange}
		   		focusedInput = {this.state.calenderfocus}
		   		onFocusChange = {this.onFocusChange}
		   		showClearDates = {true}
		   		numberOfMonths = {1}
		   		isOutsideRange ={() => false}
		   	/>
		   </div>	
		)
	}
}


const mapStateToProps = state => {
	return {
		filter: state.filter
	};
}

export default connect(mapStateToProps)(ExpenseListFilter);