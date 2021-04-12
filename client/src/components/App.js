import { BrowserRouter as Router, Route} from 'react-router-dom'
import AuthPage from './auth/AuthPage'
import Homepage from './content/Homepage'
import NotLoggedIn from './auth/NotLoggedIn'

function App() {
  return (
    <Router>
      <Route exact path ="/" component={AuthPage} />
      <Route exact path ="/login" component={AuthPage} />
      <Route exact path ="/register" component={AuthPage} />
      <Route exact path ="/homepage" component={Homepage} />
      <Route exact path ="/notloggedin" component={NotLoggedIn} />
    </Router>
  );
}

export default App;
