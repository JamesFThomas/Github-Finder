import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

// this function renders our application to the DOM
ReactDOM.render(
  <React.StrictMode>
    {/* Entry point for our application */}
    <App />
  </React.StrictMode>,
  // function that appends our application to html element
  document.getElementById('root')
);


