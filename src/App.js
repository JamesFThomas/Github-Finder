import React from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import './App.css';

// this is the parent component of our application
// all other components enter through here
const App = ()=>{

    return (
      <div className="App">
        <Navbar />
        <div className='container'>
          <Users />
        </div>
      </div>
    );

}

export default App;
