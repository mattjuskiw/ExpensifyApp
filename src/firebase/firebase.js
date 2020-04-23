import * as firebase from 'firebase';
import moment from 'moment';

const config = {
    apiKey: "AIzaSyCPcr1oFR6XgoD82VouQXAIfC7uK-HXohw",
    authDomain: "juskiwexpensify.firebaseapp.com",
    databaseURL: "https://juskiwexpensify.firebaseio.com",
    projectId: "juskiwexpensify",
    storageBucket: "juskiwexpensify.appspot.com",
    messagingSenderId: "1090053641696",
    appId: "1:1090053641696:web:e4ba889ea04906beee4785"
};

firebase.initializeApp(config);

const database = firebase.database();

const removedChild = database.ref('expenses').on('child_removed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

const changedChild = database.ref('expenses').on('child_changed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

const addedChild = database.ref('expenses').on('child_added', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});