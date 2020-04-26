import { login, logout } from '../../actions/auth';

// TEST: login()
test('should generate login action object', () => {
	const uid = 'abc';
	const action = login(uid);
	expect(action).toEqual({
		type: 'LOGIN',
		uid
	});
});

// TEST: logout()
test('should generate logout action object', () => {
	const action = logout();
	expect(action).toEqual({
		type: 'LOGOUT'
	});
});