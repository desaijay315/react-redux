import { createStore , combineReducers } from 'redux';
import uuid from 'uuid';


//add_expense
const addExpense = (
	{ 
		description ='', 
		note ='', 
		amount = 0 , 
		createdAt = 0 
    } = {}
   ) =>({
    type : 'ADD_EXPENSE',
    expense : {
    	id : uuid(),
    	description,
    	note,
    	amount,
    	createdAt
    }
})

//remove_expense

const removeExpense = ({ id } = {}) => ({
    type : 'REMOVE_EXPENSE',
    id
});

//edit expense

const editExpense = (id, updates) => ({
   type : 'EDIT_EXPENSE',
   id,
   updates
});

const setTextFilter = (text = '') => ({
	type : 'SET_TEXT_FILTER',
	text
});

//default expenses
const expensesReducerDefaultState = [];

//default filter state

const filterReducerDefaultState  = {
	text      : '',
	sortBy    : 'date', //date or amount
	startDate : undefined,
	endDate   : undefined
}

//expenses reducers
const expensesReducers = (state = expensesReducerDefaultState  , action) => {
   switch(action.type){
   	 case 'ADD_EXPENSE':
   	  return [
        ...state,
        action.expense
   	  ]
   	  break;
   	  case 'REMOVE_EXPENSE':
   	  return state.filter(({ id }) => id !== action.id);
   	  break;
   	  case 'EDIT_EXPENSE':
   	   return state.map((expense) => {
         if(expense.id === action.id){
            return {
            	...expense,
            	...action.updates
            };
         }else{
         	return expense;
         }
   	   });
   	  break;
     default:
      return state;
   }
}


//filter reducers

const filterReducer = (state = filterReducerDefaultState, action ) => {
	switch (action.type) {
		case 'SET_TEXT_FILTER':
		  return {
		  	 ...state,
		  	 text : action.text
		  };
		default:
			return state;
	}
}

//creation store
const store  = createStore(combineReducers({
	expenses : expensesReducers,
	filter: filterReducer
}));

store.subscribe(() => {
console.log(store.getState());	
})

const expenseOne = store.dispatch(addExpense({description : 'Rent', amount : 100}));
const expenseTwo = store.dispatch(addExpense({description : 'Coddfee', amount : 600}));


store.dispatch(removeExpense({id: expenseOne.expense.id}));
store.dispatch(editExpense(expenseTwo.expense.id, { amount : 1000}));

store.dispatch(setTextFilter('rent'));

const demoState = {
	expenses :[{
		id          : 'asfsdf43',
		description : 'January Rent',
		note        : 'This was the funal payment for that address',
		amount      : 54500,
		createdAt   : 0
	}],
	filter : {
		text      : 'rent',
		sortBy    : 'amount', //date or amount
		startDate : undefined,
		endDate   : undefined
	}
};



// const user = {
// 	name : "jaydesa",
// 	age : 20
// };

// console.log({
// 	...user
// });