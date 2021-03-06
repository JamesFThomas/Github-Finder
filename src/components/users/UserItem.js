import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


// this component displays GitHub API User data
const UserItem = ({user: {login, avatar_url, html_url}}) =>  {

    // User component passed in as prop titled 'user'
    // user data deconstructed from props object and displayed on DOM
    return (
      <div className='card text-center'>

        <img
          src={avatar_url}
          alt=''
          className='round-img'
          style={{width:' 60px'}}
        />

        <h3>{login}</h3>

        <div>

            <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
              More
            </Link>

        </div>

      </div>
    )

}

// sets required data type for value to be used as props
UserItem.propTypes = {
  user:PropTypes.object.isRequired,
}
export default UserItem
