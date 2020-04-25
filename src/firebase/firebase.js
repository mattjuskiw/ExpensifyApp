import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DB_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MSG_ID,
    appId: process.env.FIREBASE_APP_ID
};

firebase.initializeApp(config);

const database = firebase.database();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, database as default, googleProvider };