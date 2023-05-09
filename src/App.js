import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import Login from './components/Login'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/ebank/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </>
)

// const App = () => <h1>App manisha</h1>

export default App
