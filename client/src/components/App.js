import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import AuthPage from './auth/AuthPage'
import HomePage from './content/HomePage.js'
import store from '../redux/store.js'
import jwt_decode from 'jwt-decode'
import { SET_CURRENT_USER } from '../redux/actions/types';
import ProtectedRoute from './ProtectedRoute'

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
          <ProtectedRoute exact path ="/homepage" component={HomePage} />
        </Router>
      </Provider>
    );
}

export default App;
