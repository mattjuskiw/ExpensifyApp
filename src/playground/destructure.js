// const person = {
// 	name: 'Matt',
// 	age: 20,
// 	location: {
// 		city: "Akron",
// 		temp: 43
// 	}
// };

// const { name, age } = person;
// const { city, temp } = person.location;

// console.log(`${name} is ${age} years old.`);
// if(city && temp) console.log(`It's ${temp} F in ${city}.`);

// const book = {
// 	title: 'Ego is the Enemy',
// 	author: 'Ryan Holiday',
// 	publisher: {
// 		name: 'Penguin'
// 	}
// };

// const { name: publisherName = "Self-published" } = book.publisher;

// console.log(publisherName);

const address = ['1365 Timber Ridge Dr.', 'Macedonia', 'Ohio', '44056'];
const [, city, state] = address;

console.log(`I live in ${city}, ${state}.`);

const menu = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [item, , mediumPrice] = menu;
console.log(`A medium ${item} costs ${mediumPrice}.`);