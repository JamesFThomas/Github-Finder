import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// COMPONENT will render when more button is clicked
export class User extends Component {

  // FUNCTION will load a single Github users page data when component is rendered
  componentDidMount(){
    this.props.getUser(this.props.match.params.login)
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
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

    const { loading } = this.props;

    if(loading ){ return <Spinner/> }

    else {

      return <Fragment>
        {name}
        <br/>
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>
      </Fragment>

    }
  }
}

export default User
