import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import User from './components/users/User'
import Search from './components/users/Search'
import About from './components/Pages/About'

import axios from 'axios'
import './App.css';

// this is the parent component of our application, all other components enter through here
class App extends Component {
  state = {
    users:[],
    user: {},
    repos: [],
    loading: false,
    alert: null
  }

  // FUNCTION that fetches Github user data from API, loads user data to DOM upon start of app
  async componentDidMount(){

    // set state loading key value to true to show spinner gif
    this.setState({loading: true});

    // authenticated GET request to Github API for first 30 users upon initial render
    const res = await axios.get(
      `https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

     // update state users key value with users data returned from API
    this.setState({ users: res.data, loading: false });
  }

  //  FUNCTION uses the string from Search component, passed up as props, as query string
  searchUsers = async text => {

    // set state loading key value to true to show spinner gif
    this.setState({loading: true})

    // authenticated GET request to Github API '/search' endpoint with text from Search component
    const res = await axios.get(
       `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

        // reset state to show users returned from search
    this.setState({users: res.data.items, loading: false});
  }

  //  FUNCTION will clear searched users from state object
  clearUsers = () => this.setState({users: [], loading: false})

  // FUNCTION will alert users to enter text for search query
  setAlert = (msg, type) =>{
    this.setState({alert: { msg: msg, type: type}})
    setTimeout(()=> this.setState({alert: null}), 5000)
  }

  // FUNCTION will GET a single Github users info
  getUser = async (username) =>{

    // set state loading key value to true to show spinner gif
    this.setState({loading: true})

    //  add user login data returned from searchUsers function
    const res = await axios.get(
       `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // update the state to show single user data returned from search
    this.setState({ user: res.data, loading: false });
  }

  // FUNCTION with GET all public repos for a single user
  getUserRepos = async (username) =>{

    // set state loading key value to true to show spinner gif
    this.setState({loading: true})

    //  add user login data returned from searchUsers function
    const res = await axios.get(
       `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    // update the state 'repos' to display user public repositories
    this.setState({ repos: res.data, loading: false });
  }

  render() {
    // destructuring values from state
    const {users, loading, alert, user, repos} = this.state;
    return (
      <Router>

      <div className="App">

        <Navbar />
        <div className='container'>

            <Alert alert={alert}/>
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search
                    searchUsers={this.searchUsers}
                    clearUsers={this.clearUsers}
                    // this boolean value will show clear button when users array has search result
                    showClear={users.length > 0 ? true : false}
                    setAlert={this.setAlert}
                    />
                  <Users
                    loading={loading}
                    users={users}
                  />
                </Fragment>
              )}/>
              <Route exact path='/about' component={About}/>
              <Route
                exact path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
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
    );
  }

}

export default App;
