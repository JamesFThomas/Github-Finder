import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    showClear: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  // this function updates the text key value of the state object
  onChange = (e) =>{
    // In order to reuse onChange with multiple input fields, use name value from event object to target desired value
    this.setState({ [e.target.name]: e.target.value});
  }

  // this function uses state text value for a GitHub API search, passes query string up via props
  onSubmit = (e) => {
    e.preventDefault();
    if(this.state.text === ''){
      this.props.setAlert('Must Enter Text In Search Field')
    }
    else {
      this.props.searchUsers(this.state.text)
      this.setState({text:''})
    }
  }

  render() {
    const {clearUsers, showClear} = this.props;

    return (
      <div>

        {/* this element will show as a form on the DOM, with text field and submit button */}
        <form onSubmit={this.onSubmit} className='form'>

          <input
            type='text'
            name='text'
            placeholder='Search Users...'
            value={this.state.text}
            onChange={this.onChange}
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
}

export default Search
