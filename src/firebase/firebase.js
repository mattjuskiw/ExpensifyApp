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