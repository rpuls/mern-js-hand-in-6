import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Books from './views/Books'
import Login from './views/Login'

const App = () => (
  <div>
    <nav>
      <ul className="header">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/company">Company</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
    <div>
      <Content />
    </div>
  </div>
)

const Home = () => (
  <div>
    <h1>Welcome to the Tornadoes Website!</h1>
  </div>
)

const Company = () => (
  <div>
    <h1>company</h1>
  </div>
)



const Content = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    {/* both /roster and /roster/:number begin with /roster */}
    <Route path='/books' component={Books} />
    <Route path='/company' component={Company} />
    <Route path='/login' component={Login} />
  </Switch>
)

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
