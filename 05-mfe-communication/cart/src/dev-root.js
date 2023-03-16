import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from 'ui-components';

import Items from './Items';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Items />
  </ThemeProvider>,
  document.querySelector('#cart-dev-root')
);
