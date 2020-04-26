import authReducer from '../../reducers/auth';

// TEST: LOGIN
test('should log user in', () => {
	const action = {
		type: 'LOGIN',
		uid: 'ABC'
	};
	const state = authReducer({}, action);
	expect(state.uid).toEqual(action.uid);
});

// TEST: LOGOUT
test('should log user out', () => {
	const action = { type: 'LOGOUT' };
	const state = authReducer({ uid: 'anything' }, action);
	expect(state).toEqual({});
});