import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import {addExpense} from './actions/expenses';
import {setTextFilter} from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store  = configureStore();

store.dispatch(addExpense({description : 'waterBill', amount : 100, createdAt : -21000}));
store.dispatch(addExpense({description : 'gasBill', amount : 100, createdAt : -21000}));
store.dispatch(setTextFilter('gasBill'));
// getVisibleExpenses(store.expenses, store.filter);

const state = store.getState();
const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
// console.log(store.getState());	
console.log(visibleExpenses);	

// console.log(store.getState());

ReactDOM.render(<AppRouter />, document.getElementById('app'));
