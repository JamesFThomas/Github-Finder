import React from 'react';
import PropTypes from 'prop-types';

const Navbar = ({icon, title}) => {
    // Navbar component utilizes default props and prop types for Navbar image & title

    return (
      <nav className='navbar bg-primary'>
        <h1>
          <i className={icon}/> {title}
        </h1>
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
