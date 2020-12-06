import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const Navbar = ({icon, title}) => {
    // Navbar component utilizes default props and prop types for Navbar image & title

    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={icon}/> {title}
        </h1>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
    )

}

// creates default props object utilizing font awesome icons
Navbar.defaultProps = {
  title:'Github Finder',
  icon: 'fab fa-github'
}

// sets required data type for value to be used as props
Navbar.propTypes = {
  title:PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
}
export default Navbar
