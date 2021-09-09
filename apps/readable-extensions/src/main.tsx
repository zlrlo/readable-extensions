import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { SERVER_HOST } from './const/api';
import AuthPage from './pages/AuthPage';
import LoginPage from './pages/LoginPage';
import 'tailwindcss/tailwind.css';

console.log(`[+] 🚀 redable-extensions from foreground with ${SERVER_HOST}`);

chrome.storage.local.get('authToken', function (data) {
  const { authToken } = data;

  ReactDOM.render(
    <StrictMode>{authToken ? <AuthPage {...data} /> : <LoginPage />}</StrictMode>,
    document.getElementById('root')
  );
});
