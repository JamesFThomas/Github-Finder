import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';
import {
  SET_ALERT,
  REMOVE_ALERT
} from '../types'

const AlertState = (props) => {
  // create object to represent initial state of application
  const initialState = null

  // initialize useReducer() hook with the state object and dispatch() function for conditional updating
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  // Function setAlert => will alert users to enter text for search query
  const setAlert = (msg, type) =>{
    // will send msg && type to reducer function
    dispatch({
      type: SET_ALERT,
      payload: { msg, type }
    })
    // will send message to reducer to remove alert after 5 seconds
    setTimeout(()=> dispatch({ type: REMOVE_ALERT }), 5000)
  }

  // makes state available to entire application
  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert
      }}
    >
        {props.children}
    </AlertContext.Provider>
  );
};


export default AlertState;


