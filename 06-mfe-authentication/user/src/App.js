import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'ui-components';

import Login from './Login';
import Register from './Register';

export default ({ onLoginSuccessful }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className='container'>
        <Routes>
          <Route path="/" element={<Login onLoginSuccessful={onLoginSuccessful} />} />
          <Route path="login" element={<Login onLoginSuccessful={onLoginSuccessful} />} />
          <Route path="register" element={<Register />} />
        </Routes >
      </div>
    </ThemeProvider>
  )
}