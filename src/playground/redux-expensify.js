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

//sort by amount
const sortByAmount = () => ({
  type : 'SORT_BY_AMOUNT'

});


//sort by date
const sortByDate = () => ({
  type : 'SORT_BY_DATE'
});

const setStartDate = (date = '') => ({
  type: 'SET_START_DATE',
  date
});

const setEndDate = (date = '') => ({
  type: 'SET_END_DATE',
  date
});


//default filter state

const filterReducerDefaultState  = {
	text      : '',
	sortBy    : 'date', //date or amount
	startDate : undefined,
	endDate   : undefined
}

//default expenses
const expensesReducerDefaultState = [];
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
	    case 'SORT_BY_DATE':
	     return {
	  	     ...state,
	  	     date : 'date'
	     };
	      case 'SORT_BY_AMOUNT':
	     return {
	  	     ...state,
	  	     sortBy : 'amount'
	     };
	     case 'SET_START_DATE':
	     return {
	  	     ...state,
	  	     startDate : action.date
	     };
	     case 'SET_END_DATE':
	     return {
	  	     ...state,
	  	     endDate : action.date
	     };
		default:
			return state;
	}
}


//get visible exepndsa 

const getVisibleExpenses = (expenses , { text , sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate ;
    const endDateMatch   = typeof startDate !== 'number' || expense.createdAt <= endDate ;
    const textMatch      = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
  	  if(sortBy === 'date'){
       return a.createdAt < b.createdAt ? 1 : -1;  	  	
  	  }else if(sortBy === 'amount'){
        return a.amount < b.amount ? 1 : -1;
  	  }
  });
}


//creation store
const store  = createStore(combineReducers({
	expenses : expensesReducers,
	filter: filterReducer
}));

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filter);
	// console.log(store.getState());	
	console.log(visibleExpenses);	
})

const expenseOne = store.dispatch(addExpense({description : 'Rent', amount : 100, createdAt : -21000}));
const expenseTwo = store.dispatch(addExpense({description : 'Coddfee', amount : 10, createdAt  : -1000}));


// store.dispatch(removeExpense({id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount : 1000}));

// store.dispatch(setTextFilter('e'));
store.dispatch(sortByAmount()); //amount
// store.dispatch(sortByDate()); //date


// store.dispatch(setStartDate(0)); //date
// // store.dispatch(setStartDate()); //date
// store.dispatch(setEndDate(1260)); //date

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