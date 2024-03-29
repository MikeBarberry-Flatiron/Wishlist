import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import store from '../store';
import { SET_CURRENT_USER } from '../store/actions/types';
import { getUserContent } from '../store/actions/contentActions';

import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import UserContent from './content/UserContent';

if (localStorage.jwt) {
  const jwt = localStorage.jwt;
  const { username } = jwt_decode(jwt);
  store.dispatch({
    type: SET_CURRENT_USER,
    payload: username,
  });
}

if (store.getState().currentUser.isAuthenticated) {
  const jwt = localStorage.jwt;
  getUserContent(jwt);
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route
          exact
          path='/'
          component={Login}
        />
        <Route
          exact
          path='/register'
          component={Register}
        />
        <ProtectedRoute
          exact
          path='/content'
          component={UserContent}
        />
      </Router>
    </Provider>
  );
}
