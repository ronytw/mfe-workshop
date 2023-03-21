import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormControl, Button, ButtonAction, ButtonSize } from 'ui-components';

import { API_ROOT } from './env';

import * as S from './form.styles';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const changeUsername = ({ target: { value } }) => {
    setUsername(value);
  }

  const changePassword = ({ target: { value } }) => {
    setPassword(value);
  }

  const changeEmail = ({ target: { value } }) => {
    setEmail(value);
  }

  const changePhone = ({ target: { value } }) => {
    setPhone(value);
  }

  const register = async (e) => {
    e.preventDefault();
    const userDetails = { email, phone , username, password };

    try {
      const response = await fetch(`${API_ROOT.DEV}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });      
      if(!response.ok) {
        throw new Error('Something went wrong');
      }
      alert('Registered successfully. Please login now');
    } catch (e) {
      alert('something went wrong');
    }
  }

  return (
    <S.FormContainer>
      <S.FormGroup>
        <FormControl label="Username" onChange={changeUsername}>
        </FormControl>
      </S.FormGroup>
      <S.FormGroup>
        <FormControl label="Email" onChange={changeEmail}>
        </FormControl>
      </S.FormGroup>
      <S.FormGroup>
        <FormControl label="Phone" onChange={changePhone}>
        </FormControl>
      </S.FormGroup>
      <S.FormGroup>
        <FormControl label="Password" type="password" onChange={changePassword}>
        </FormControl>
      </S.FormGroup>
      <S.SignUp>Already have an account, Please Login <Link to="/login">here</Link></S.SignUp>
      <Button
        id="register"
        buttonType={ButtonAction.PRIMARY}
        size={ButtonSize.DEFAULT}
        disabled={!username || !password || !email || !phone}
        onClick={register}>
        Register
      </Button>
    </S.FormContainer>
  )
};
