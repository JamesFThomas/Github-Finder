import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/Pages/About';
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
                  <Route exact path='/' render={props => (
                    <Fragment>
                      <Search />
                      <Users />
                    </Fragment>
                  )}/>
                  <Route exact path='/about' component={About}/>
                  <Route
                    exact path='/user/:login'
                    component={User}
                  />
                </Switch>


              </div>
          </div>
        </Router>
        </AlertState>
      </GithubState>
    );
}

export default App;
