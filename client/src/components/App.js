import jwt_decode from 'jwt-decode'

import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store.js'
import { SET_CURRENT_USER } from '../redux/actions/types';
import { getUserContent } from '../redux/actions/contentActions';

import ProtectedRoute from './ProtectedRoute'
import AuthPage from './auth/AuthPage'
import HomePage from './content/HomePage.js'

if (localStorage.jwt) {
    const jwt = localStorage.jwt 
    const { user_name } = jwt_decode(jwt)
      store.dispatch({
        type: SET_CURRENT_USER,
        payload: user_name
      })
}

if (store.getState().isAuthenticated) {
  const jwt = localStorage.jwt 
  getUserContent(jwt)
}

function App() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path ="/" component={AuthPage} />
          <Route exact path ="/login" component={AuthPage} />
          <Route exact path ="/register" component={AuthPage} />
          <ProtectedRoute exact path ="/homepage" component={HomePage} />
        </Router>
      </Provider>
    );
}

export default App;
