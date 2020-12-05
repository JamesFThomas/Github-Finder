import React, { Component } from 'react'

// COMPONENT will render when more button is clicked
export class User extends Component {

  // FUNCTION will load a single Github users page data when component is rendered
  componentDidMount(){
    this.props.getUser(this.props.match.params.login)
  }
  render() {

    const {
      name,
      avatar_url,
      location,
      bio,
      blog,
      login,
      html_url,
      followers,
      following,
      public_repos,
      public_gists,
      hireable
    } = this.props.user;

    // const { loading } = this.props;

    return (
      <div>
        {name}
      </div>
    )
  }
}

export default User
