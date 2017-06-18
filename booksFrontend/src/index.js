import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import Books from './views/Books'
import Login from './views/Login'
import BookStore from './models/BookStore'

const App = () => (
  <div>
    <nav className="navbar navbar-default">
      <ul className="nav navbar-nav">
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
    <h1>React seed made by Rasmus Puls!</h1>
    <p>Seed including; mongoose, express, react, node.js, login syetm, JWT session, password hashing & salting</p>
    <p>Note that the backed for this seed is a seperate app, and needs to run for this seed to work. </p>
  </div>
)

const Company = () => (
  <div>
    <h1>company</h1>
  </div>
)

    /*
    <Route path='/books' component={Books} books={["1 bog"]} render=/> //BookStore.books
    */

const Content = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    {/* both /roster and /roster/:number begin with /roster */}
    <Route path='/books' render={(props) => (<Books {...props} books={BookStore.books}/>)} />
    <Route path='/company' component={Company} />
    <Route path='/login' component={Login} />
  </Switch>
)

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'))
