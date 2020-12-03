import React, {Component} from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import './App.css';

// this is the parent component of our application, all other components enter through here

class App extends Component {
  state = {
    users:[],
    loading: false
  }

  // lifecycle method that fetches Github user data from API, loads user data to DOM upon start of app
  async componentDidMount(){

    this.setState({loading: true});

    // added Github API client id && client secret to axios GET request for authentication of application
    const res = await axios.get(`https://api.github.com/users?client_id=$
    {process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=$
    {process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({users: res.data, loading: false});
  }

  render() {
    return (
      <div className="App">

        <Navbar />

        <div className='container'>

          <Users loading={this.state.loading} users={this.state.users}/>

        </div>

      </div>
    );
  }

}

export default App;
