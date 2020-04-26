import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';

export const Login = ({ startLogin }) => (
	<div className="box-layout">
		<div className="box-layout__box">
			<h1>Expensify</h1>
			<p>It's time to get your expenses under control.</p>
			<p>
				Following Udemy course 
				<span>
					-- "Complete React Developer Course"
				</span>.
			</p>
			<button className="button" onClick={startLogin}>Login with Google</button>
		</div>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(Login);