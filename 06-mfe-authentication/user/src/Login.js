import React, { useState } from 'react';
import { FormControl, Button, ButtonAction, ButtonSize } from 'ui-components';
import { Link } from 'react-router-dom';

import { API_ROOT } from './env';

import * as S from './form.styles';

export default function Login({ onLoginSuccessful }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = ({ target: { value } }) => {
    setUsername(value);
  }

  const changePassword = ({ target: { value } }) => {
    setPassword(value);
  }

  const login = async (e) => {
    e.preventDefault();
    const userDetails = { username, password };
    try {
      const response = await fetch(`${API_ROOT.DEV}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });
      if (!response.ok) {
        throw new Error('username or password is incorrect')
      }
      const responseJson = await response.json();
      const authToken = await responseJson.token;
      localStorage.setItem("authToken", authToken);
      localStorage.setItem("isLoggedIn", true);
      window.history.back();
      if(onLoginSuccessful) onLoginSuccessful(authToken);
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <S.FormContainer>
      <S.FormGroup>
        <FormControl id="username" label="Username" onChange={changeUsername}>
        </FormControl>
      </S.FormGroup>
      <S.FormGroup>
        <FormControl id="password" label="Password" type="password" onChange={changePassword}>
        </FormControl>
      </S.FormGroup>
      <S.SignUp>Don't have an account, Please register <Link to="/register">here</Link></S.SignUp>
      <Button
        id="login"
        buttonType={ButtonAction.PRIMARY}
        size={ButtonSize.DEFAULT}
        disabled={!username || !password}
        onClick={login}>
        Login
      </Button>
    </S.FormContainer>
  )
};
