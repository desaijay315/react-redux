import { createStore } from 'redux';

 //action generators -  destructuring fucntion that return action obejects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
 	type : 'INCREMENT',
   	incrementBy	
});

const decrementCount = ({decrementBy = 1 } = {}) => ({
	type : 'DECREMENT',
   	decrementBy
})

//set

const set = ({countset = 100} = {}) => ({
   type:'SET',
   countset
})

const reset = ({count = 0} = {}) => ({
	type : 'RESET',
	count
})

const store = createStore((state = { count: 1 }, action) => {

	switch (action.type) {
		case 'INCREMENT':
			return{
				count : state.count + action.incrementBy
			}
			break;
			case 'DECREMENT':
			return{
				count : state.count - action.decrementBy
			}
			break;
			case 'SET':
			return{
				count : action.countset
			}
			break;
			case 'RESET':
			// statements_1
			return{
				count : action.count
			}
			break;
		default:
			return state;
			break;
	}
  return state;
});


const unsubscribe = store.subscribe(() => {
	console.log(store.getState());
})


store.dispatch(incrementCount({ incrementBy : 5 }));
store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy : 1 }));
store.dispatch(set({countset : 1000}));
store.dispatch(set());
store.dispatch(reset());



// store.dispatch({
// 	type : 'DECREMENT',
// 	decrementBy : 10

// })



// store.dispatch({
// 	type : 'RESET'
// })

// unsubscribe();



// Actions
// I'd like to increment the count
// I'd like to reset the count to zero
