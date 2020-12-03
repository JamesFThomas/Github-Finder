import React, { Component } from 'react'
import UserItem from './UserItem'

class Users extends Component {
  // this function maps through the gitHub users object to display user data


  render() {
    return (
      <div style={userStyle}>
        {this.props.users.map( user =>(
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    )
  }
}

// function allows us to set style attributes for DOM display of GitHub user data
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
