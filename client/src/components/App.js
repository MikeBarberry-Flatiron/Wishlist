import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import AuthPage from './auth/AuthPage'
import HomePage from './content/HomePage.js'
import NotLoggedIn from './auth/NotLoggedIn'
import store from '../redux/store.js'
import jwt_decode from 'jwt-decode'
import { SET_CURRENT_USER } from '../redux/actions/types';

if (localStorage.jwt) {
    const jwt = localStorage.jwt 
    const { user_name } = jwt_decode(jwt)
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: user_name
    })
}

function App() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path ="/" component={AuthPage} />
          <Route exact path ="/login" component={AuthPage} />
          <Route exact path ="/register" component={AuthPage} />
          <Route exact path ="/homepage" component={HomePage} />
          <Route exact path ="/notloggedin" component={NotLoggedIn} />
        </Router>
      </Provider>
    );
}

export default App;
