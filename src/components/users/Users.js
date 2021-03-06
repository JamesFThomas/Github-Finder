import React, { useContext, useEffect } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users = () => {

  // initialize the imported githubContext with hook to access state actions and attributes
  const githubContext = useContext(GithubContext)

  // deconstructed state attributes from githubContext for use in component
  const { loading, users, getInitialUsers } = githubContext;

  useEffect(()=>{
    getInitialUsers();
    // eslint-disable-next-line
  },[])

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

// function allows us to set style attributes for DOM display of GitHub user data
const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
}

export default Users
