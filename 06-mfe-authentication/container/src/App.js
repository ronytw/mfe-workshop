import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'ui-components';
import { GlobalStyles } from './GlobalStyles';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import * as S from './App.styles';
import Catalog from './pages/Catalog';
import User from './pages/User';
import Cart from './pages/Cart';

export default () => {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ accessToken, setAccessToken ] = useState(false);

  const onLoginSuccessful = (accessToken) => {
    setAccessToken(accessToken);
    setIsLoggedIn(true);

    console.log(accessToken);
  };

  const onLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <S.App>
          <Header isLoggedIn={isLoggedIn} accessToken={accessToken} onLogout={onLogout} />
          <S.Main>
            <Routes>
              <Route path='/' element={<Catalog />} />
              <Route path='/products' element={<Catalog />} />
              <Route path='/login' element={<User onLoginSuccessful={onLoginSuccessful} />} />
              <Route path='/cart' element={<Cart accessToken={accessToken} />} />
            </Routes>
          </S.Main>
          <Footer />
        </S.App>
      </ThemeProvider>
    </BrowserRouter>
  )
}