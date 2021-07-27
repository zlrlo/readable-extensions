import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import AuthPage from './pages/AuthPagae';
import LoginPage from './pages/LoginPage';

console.log('[+] 🚀 redable-extensions from foreground.');

chrome.storage.local.get('authToken', function (data) {
  const { authToken } = data;

  ReactDOM.render(
    <StrictMode>{authToken ? <AuthPage {...data} /> : <LoginPage />}</StrictMode>,
    document.getElementById('root')
  );
});
