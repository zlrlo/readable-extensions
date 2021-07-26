import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './pages';
import Login from './pages/login';

console.log('[+] 🚀 redable-extensions from foreground.');

chrome.storage.local.get('authToken', function (data) {
  const { authToken } = data;

  ReactDOM.render(
    <StrictMode>{authToken ? <App {...data} /> : <Login />}</StrictMode>,
    document.getElementById('root')
  );
});
