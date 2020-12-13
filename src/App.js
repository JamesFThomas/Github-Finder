import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import User from './components/users/User';
import Alert from './components/layout/Alert';
// import Search from './components/users/Search';
import Home from './components/Pages/Home';
import About from './components/Pages/About';
import NotFound from './components/Pages/NotFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

// this is the parent component of our application, all other components enter through here
const App = () => {

    return (
      <GithubState>
      <AlertState>
        <Router>

          <div className="App">

            <Navbar />
            <div className='container'>

                <Alert />
                <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route exact path='/about' component={About}/>
                  <Route exact path='/user/:login' component={User} />
                  <Route component={NotFound} />
                </Switch>

              </div>
          </div>
        </Router>
        </AlertState>
      </GithubState>
    );
}

export default App;
