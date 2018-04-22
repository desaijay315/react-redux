import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

const ExpenseList = props => (
    <div>
 		<h2>Expense List</h2>
 		{props.expenses.map((expense) =>{
          return <ExpenseListItem key={expense.id} {...expense} />
 		 })}

    </div>
);



const mapStateToProps = state => {
	return {
		expenses : getVisibleExpenses(state.expenses,state.filter)
	};
};


export default connect(mapStateToProps)(ExpenseList);