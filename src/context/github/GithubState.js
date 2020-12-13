import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  INITIAL_USERS,
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types'

const GithubState = (props) => {
  // create object to represent initial state of application
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  // initialize useReducer() hook with the state object and dispatch() function for conditional updating
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // FUNCTION getInitialUsers() => will GET first 30 Github users info
  const getInitialUsers = async function() {
    // set state loading attribute to true to show spinner gif
    setLoading()
    // authenticated GET request to Github API '/search' endpoint with text from Search component
    const res = await axios.get(
              `https://api.github.com/users?client_id=${
                process.env.REACT_APP_GITHUB_CLIENT_ID
              }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // sends the returned information to reducer as payload
    dispatch({
      type: INITIAL_USERS,
      payload: res.data
    });
  }

  // FUNCTION searchUser() => uses the string from Search component, passed up as props, as query string
  const searchUsers = async text => {
    // set state loading attribute to true to show spinner gif
    setLoading()
    // authenticated GET request to Github API '/search' endpoint with text from Search component
    const res = await axios.get(
       `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // sends the returned information to reducer as payload
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  }

  // FUNCTION getUser() => will GET a single Github users info
  const getUser = async (username) =>{
    // set state loading key value to true to show spinner gif
    setLoading();
    //  add user login data returned from searchUsers function
    const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    // sends the returned information to Reducer
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // FUNCTION getUserRepos() => will make GET request tp github API for the public repos of a single user
    const getUserRepos = async (username) =>{
      // set state loading key value to true to show spinner gif
      setLoading( );
      // add user login data returned from searchUsers function
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
          process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
      // sends the returned information to the Reducer
      dispatch({
        type: GET_REPOS,
        payload: res.data
      })
    }

  //  FUNCTION  clearUsers() => removes searched users from state object and screen display
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  }

  // FUNCTION setLoading() => set state loading attribute so spinner GIF will show
  const setLoading = () =>{
    dispatch({ type: SET_LOADING });
  }

  // makes state available to entire application
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
        getInitialUsers
      }}
    >
        {props.children}
    </GithubContext.Provider>
  );
};


export default GithubState;
// initial application state & application functionality

