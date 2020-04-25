import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from '../components/Login';
import Header from '../components/Header';
import AddExpense from '../components/AddExpense';
import EditExpense from '../components/EditExpense';
import Dashboard from '../components/Dashboard';
import HelpPage from '../components/HelpPage';
import NotFound from '../components/NotFound';

export const history = createHistory();

const AppRouter = () => (
	<Router history={history}>
		<div>
			<Header />
	
			<Switch>
				<Route path="/" component={Login} exact={true} />
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/create" component={AddExpense} />
				<Route path="/edit/:id" component={EditExpense} />
				<Route path="/help" component={HelpPage} />
				<Route component={NotFound} />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;