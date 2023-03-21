import React from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import Items from './Items';

export default () => {
  return (
    <div className='container'>
      <StylesProvider>
        <Items />
      </StylesProvider>
    </div>
  )
}