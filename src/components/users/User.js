import React, { Fragment, Component } from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


// COMPONENT will render when more button is clicked
export class User extends Component {

  // FUNCTION will load a single Github users page data when component is rendered
  componentDidMount(){
    this.props.getUser(this.props.match.params.login)
    this.props.getUserRepos(this.props.match.params.login)
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  }



  render() {

    const {
      name,
      company,
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

    const { loading, repos } = this.props;

    if(loading ){ return <Spinner/> }

    else {

      return <Fragment>
        <br/>
        {/* Show button to return home page */}
        <Link to='/' className='btn btn-light'>
          Back To Search
        </Link>

        {/* Show a check mark if user hireable attribute is true, x if false */}
        Hireable: {''}
        {hireable ? (
          <i className='fas fa-check text-success'/>
        ): (
          <i className='fas fa-times-circle text-danger'/>
        )}

        {/* Display users avatar photo */}
        <div className='card grid-2'>
          <div className='all-center'>
            <img
              src={avatar_url}
              className='round-img'
              alt=''
              style={{ width: '150px' }}
            />

            <h1>{name}</h1>
            <p> Location: {location}</p>
          </div>

          <div>
            {bio && <Fragment>
              <h3>Biography</h3>
              <p>{bio}</p>
              </Fragment>
            }
            <a href={html_url} className="btn btn-dark my-1">
              GitHUb User Profile
            </a>
            <ul>
              <li>
                {login && <Fragment>
                    <strong>Username:</strong> {login}
                  </Fragment>}
              </li>
              <li>
                {company && <Fragment>
                    <strong>Company:</strong> {company}
                  </Fragment>}
              </li>
              <li>
                {blog && <Fragment>
                    <strong>Website:</strong> {blog}
                  </Fragment>}
              </li>
            </ul>
          </div>
        </div>

        <div className='card text-center'>
                <div className='badge badge-primary'> Followers: {followers}</div>
                <div className='badge badge-success'> Following: {following}</div>
                <div className='badge badge-light'> Public Repos: {public_repos}</div>
                <div className='badge badge-dark'> Public Gists: {public_gists}</div>
        </div>

        <Repos repos={repos}/>

      </Fragment>
    }
  }
}

export default User
