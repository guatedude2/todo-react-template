import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Todo from './containers/Todo';

// basic router
export default (
	<Route path='/' component={App}>
		<IndexRoute component={Todo} />
    <Route path=":filter" component={Todo} />
	</Route>
);
