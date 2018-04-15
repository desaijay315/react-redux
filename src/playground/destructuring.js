
//object desctructiuring

// const person = {
// 	name : 'jaydesai',
// 	age : 26,
// 	location : {
// 		city :'Mumbai',
// 		temp : 45
// 	}
// };


// const {name : firstname = 'A', age,location} = person;
// const {city,temp: temparatre} = person.location;


// console.log(`${firstname} is age ${age} at location ${city} with temparatre ${temparatre}`);


// const book = {
// 	title : 'Ego ist the enemy',
// 	author : 'Ryan Holifady',
// 	publisher : {
// 		name : 'Penguin'
// 	}
// };


// // const { publisher : publisherName = 'Self-published'} = book

// const { name:publisherName = 'Self-published' } = book.publisher;

// console.log(publisherName);


//array desctructiuring



const address = ['A202', 'Samruddhi', 'M G Road', 'Kandivali west', 'Mumbai'];

const [ floorflat, , , area, city="cheenai"] = address

console.log(`${floorflat} and city is ${city}`);