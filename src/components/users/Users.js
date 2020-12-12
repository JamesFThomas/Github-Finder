import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';

const Users = () => {

  // initialize the imported githubContext with hook to access state actions and attributes
  const githubContext = useContext(GithubContext)

  // deconstructed state attributes from githubContext for use in component
  const { loading, users } = githubContext;

  // this function maps through the gitHub users object to display user data
  if(loading){
    return <Spinner/>
  }
  else{
    return (
      <div style={userStyle}>
        {users.map( user =>(
          <UserItem key={user.id} user={user}/>
        ))}
      </div>
    )
  }
}

// sets the required data types of values passed as props to Users component
Users.proTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
}

// function allows us to set style attributes for DOM display of GitHub user data
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
