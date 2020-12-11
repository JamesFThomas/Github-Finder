import React, { useState } from 'react'
import PropTypes from 'prop-types'


const Search = ( {searchUsers, setAlert, showClear, clearUsers} ) => {

  const  [ text, setText] = useState('');

  // this function updates the text key value of the state object
  const onChange = (e) => {setText(e.target.value); }

  // this function uses state text value for a GitHub API search, passes query string up via props
  const onSubmit = (e) => {
    e.preventDefault();
    if(text === ''){
      setAlert('Must Enter Text In Search Field')
    }
    else {
      searchUsers(text)
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
          {showClear && (
            <button
              className='btn btn-light btn-block'
              onClick={clearUsers}
            >
              Clear Users
            </button>
          )}

      </div>
    )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired,
}

export default Search
