import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alert = () => {
  // initialize the alertContext inside this component
  const alertContext = useContext(AlertContext);

  // destructor alert from alertContext object
  const { alert } = alertContext;

  return (
    alert !== null && (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' /> {alert.msg}
      </div>
    )
  )
}

export default Alert

