import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from '../components/Login';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import Dashboard from '../components/Dashboard';
import HelpPage from '../components/HelpPage';
import NotFound from '../components/NotFound';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Switch>
				<Route path="/" component={Login} exact={true} />
				<PrivateRoute path="/dashboard" component={Dashboard} />
				<PrivateRoute path="/create" component={AddExpense} />
				<PrivateRoute path="/edit/:id" component={EditExpense} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;