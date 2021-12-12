import jwt_decode from 'jwt-decode'

import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { SET_CURRENT_USER } from './store/actions/types';
import { getUserContent } from './store/actions/contentActions';

import { AuthPage, HomePage, ProtectedRoute } from './components' 

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
