import { firebase, googleProvider } from '../firebase/firebase';

export const startLogin = () => {
	return (dispatch) => {
		return firebase.auth().signInWithPopup(googleProvider);
	};
};

export const startLogout = () => {
	return (dispatch) => {
		return firebase.auth().signOut();
	};
};