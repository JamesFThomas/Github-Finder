import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';


const Search = ( ) => {
  // initalizing new context in order to access methods, reducers, etc.
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);

  const  [ text, setText ] = useState('');

  // this function updates the text key value of the state object
  const onChange = (e) => {setText(e.target.value); }

  // this function uses state text value for a GitHub API search, passes query string up via props
  const onSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
     alertContext.setAlert('Must Enter Text In Search Field')
    }
    else {
      githubContext.searchUsers(text)
      setText('')
    }
  }

    return (
      <div>

        {/* this element will show as a form on the DOM, with text field and submit button */}
        <form onSubmit={onSubmit} className='form'>

          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={text}
            onChange={onChange}
          />

          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />

        </form>

          {/* This conditional with "&&' will show clear button when users rendered to page only*/}
          {githubContext.users.length > 0 && (
            <button
              className='btn btn-light btn-block'
              onClick={githubContext.clearUsers}
            >
              Clear Users
            </button>
          )}

      </div>
    )
}

export default Search
