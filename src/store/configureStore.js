import {createStore, combineReducers } from 'redux';
import expensesReducers from '../reducers/expenses';
import filterReducer from '../reducers/filters';

export default () =>{
	//creation store
	const store  = createStore(combineReducers({
		expenses : expensesReducers,
		filter: filterReducer
	}));

  return store;
}

