import { BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import AuthPage from './auth/AuthPage'
import Homepage from './content/Homepage'
import NotLoggedIn from './auth/NotLoggedIn'
import store from '../core/store.js'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path ="/" component={AuthPage} />
        <Route exact path ="/login" component={AuthPage} />
        <Route exact path ="/register" component={AuthPage} />
        <Route exact path ="/homepage" component={Homepage} />
        <Route exact path ="/notloggedin" component={NotLoggedIn} />
      </Router>
    </Provider>
  );
}

export default App;
