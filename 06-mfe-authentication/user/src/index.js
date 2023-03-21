import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

window.mountUserMfe = (el, onLoginSuccessful) => {
  ReactDOM.render(
    <BrowserRouter>
      <App onLoginSuccessful={onLoginSuccessful} />
    </BrowserRouter>,
    el
  )
}
