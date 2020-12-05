import React, {Component, Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Users from './components/users/Users'
import Search from './components/users/Search'
import About from './components/Pages/About'

import axios from 'axios'
import './App.css';

// this is the parent component of our application, all other components enter through here
class App extends Component {
  state = {
    users:[],
    loading: false,
    alert: null
  }

  // lifecycle method that fetches Github user data from API, loads user data to DOM upon start of app
  async componentDidMount(){
    this.setState({loading: true});
    // added Github API client id && client secret to axios GET request for authentication of application
    const res = await axios.get(
      `https://api.github.com/users?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data, loading: false});
  }

  // this function uses the string from Search component, passed up as props, as query string
  searchUsers = async text => {
    this.setState({loading: true})
    //  add text from form to axios GET request to API search endpoint with text as query string
    const res = await axios.get(
       `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // reset state to show users returned from search
    this.setState({users: res.data.items, loading: false});
  }

  //  this function will clear searched users from state object
  clearUsers = () => this.setState({users: [], loading: false})

  // this function will alert users to enter text for search query
  setAlert = (msg, type) =>{
    this.setState({alert: { msg: msg, type: type}})
    setTimeout(()=> this.setState({alert: null}), 5000)
  }

  render() {
    // destructuring values from state
    const {users, loading, alert} = this.state;
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
            </Switch>


          </div>
      </div>
    </Router>
    );
  }

}

export default App;
