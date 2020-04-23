const removedChild = database.ref('expenses').on('child_removed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

const changedChild = database.ref('expenses').on('child_changed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

const addedChild = database.ref('expenses').on('child_added', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

const expenses = [
	{
		description: 'Rent',
		amount: 10000,
		notes: '',
		createdAt: moment(0).add(4, 'days').format('ddd, MMM Do, YYYY @ h:mm A')
	}, {
		description: 'Coffee',
		amount: 300,
		notes: 'It was good.',
		createdAt: moment(0).add(6, 'days').format('ddd, MMM Do, YYYY @ h:mm A')
	}
];

database.ref('expenses').push(expenses[0]);
database.ref('expenses').push(expenses[1]);

database.ref('expenses').once('value').then((snapshot) => {
	const expenses = [];
	snapshot.forEach((child) => {
		expenses.push({
			id: child.key,
			...child.val()
		});
	});

	console.log(expenses);
});

const subExpenses = database.ref('expenses').on('value', (snapshot) => {
	const expenses = [];
	snapshot.forEach((child) => {
		expenses.push({
			id: child.key,
			...child.val()
		});
	});

	console.log(expenses);
}, (err) => {
	console.log('Error: ', err);
});

setTimeout(() => {
	database.ref('expenses').push({
		description: 'Red Bull',
		amount: 3,
		notes: 'wings!',
		createdAt: 200
	});
}, 4000);

database.ref('notes/-M5cBIxuDcuUGE8Wziox').update({
	body: "Buy food"
});

database.ref('notes').push({
	title: 'Course Topics',
	body: 'React, Firebase'
});

// RETRIEVE DATA ONCE
database.ref('location')
	.once('value').then((snapshot) => {
		console.log(snapshot.val());
	})
	.catch((err) => {
		console.log(err);
	});

// RETRIEVE DATA ONCE IMMEDIATE, THEN ON EVERY DATA CHANGE (Data subscription)
const dataChange = database.ref().on('value', (snapshot) => {
	console.log(snapshot.val());
}, (err) => {
	console.log('Error: ', err);
});

// To unsubscribe: database.ref().off();

// SET DATABASE
database.ref().set({
	name: 'Matt Juskiw',
	age: 20,
	isSingle: true,
	location: {
		city: 'Macedonia',
		state: 'Ohio',
		country: 'United States'
	}
});

// REMOVING DATA
database.ref('isSingle').set(null);
database.ref('isSingle').remove();

// UPDATING DATA
database.ref().update({
	name: 'Matthew Juskiw',
	stressLevel: 9,
	job: {
		title: 'Software Developer',
		company: 'Amazon'
	},
	'location/city': 'Seattle',
	'location/state': 'WA',
	attributes: {
		height: 67,
		weight: 140
	}
});

database.ref().update({
	stressLevel: 9,
	job: {
		title: 'Software Developer',
		company: 'Amazon'
	},
	'location/city': 'Seattle',
	'location/state': 'WA'
});