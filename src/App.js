import React, {useState, Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/Pages/About'
import axios from 'axios';
import GithubState from './context/github/GithubState'

import './App.css';

// this is the parent component of our application, all other components enter through here
const App = () => {
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // FUNCTION that fetches Github user data from API, loads user data to DOM upon start of app
  // useEffect(async () =>{

  //   // set state loading key value to true to show spinner gif
  //   setLoading(true)

  //   // GET request to Github API for first 30 users upon initial render
  //   const res = await axios.get(
  //         `https://api.github.com/users?client_id=${
  //           process.env.REACT_APP_GITHUB_CLIENT_ID
  //         }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //   // update state users key value with users data returned from API
  //   setUsers(res.data)

  //   // set state loading key value to false to stop spinner gif
  //   setLoading(false)
  //   // eslint-disable-next-line
  // }, [])

  // FUNCTION will alert users to enter text for search query
  const showAlert = (msg, type) =>{
    setAlert({ msg, type })
    setTimeout(()=> setAlert(null), 5000)
  }

  // FUNCTION will GET a single Github users info
  const getUser = async (username) =>{

    // set state loading key value to true to show spinner gif
    setLoading(true);

    //  add user login data returned from searchUsers function
    const res = await axios.get(
       `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // update the state to show single user data returned from search
    setUser( res.data );

    // update loading attribute to false to stop spinner
    setLoading(false);
  }

  // FUNCTION with GET all public repos for a single user
  const getUserRepos = async (username) =>{

    // set state loading key value to true to show spinner gif
    setLoading( true );

    //  add user login data returned from searchUsers function
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
          process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // update the state 'repos' to display user public repositories
    setRepos( res.data );

    // reset loading state attribute to false
    setLoading( false );
  }

    return (
      <GithubState>
        <Router>

          <div className="App">

            <Navbar />
            <div className='container'>

                <Alert alert={alert}/>
                <Switch>
                  <Route exact path='/' render={props => (
                    <Fragment>
                      <Search
                         setAlert={showAlert}
                      />
                      <Users />
                    </Fragment>
                  )}/>
                  <Route exact path='/about' component={About}/>
                  <Route
                    exact path='/user/:login'
                    render={props => (
                      <User
                        {...props}
                        getUser={getUser}
                        getUserRepos={getUserRepos}
                        user={user}
                        repos={repos}
                        loading={loading}
                      />
                    )}
                  />
                </Switch>


              </div>
          </div>
        </Router>
      </GithubState>
    );
}

export default App;
