import React, {useState, Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/Pages/About'
import GithubState from './context/github/GithubState'

import './App.css';

// this is the parent component of our application, all other components enter through here
const App = () => {

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
                    component={User}
                  />
                </Switch>


              </div>
          </div>
        </Router>
      </GithubState>
    );
}

export default App;
