import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './app';

const Root = ({ store }) => (
  <CookiesProvider>
    <Provider store={ store }>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </CookiesProvider>
);

export default Root;