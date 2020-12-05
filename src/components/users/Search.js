import React, { Component } from 'react'
import PropTypes from 'prop-types'


export class Search extends Component {
  state = {
    text: ''
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
  }

  // this function updates the text key value of the state object
  onChange = (e) =>{
    // In order to reuse onChange with multiple input fields, use name value from event object to target desired value
    this.setState({ [e.target.name]: e.target.value});
  }

  // this function uses state text value for a GitHub API search, passes query string up via props
  onSubmit = (e) => {
    e.preventDefault();
    this.props.searchUsers(this.state.text)
    this.setState({text:''})
  }

  render() {
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

      </div>
    )
  }
}

export default Search