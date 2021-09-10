import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import App from '@extensions/app';
import { SERVER_HOST } from '@extensions/const/api';
import 'tailwindcss/tailwind.css';
import { AuthProvider } from '@extensions/store/AuthProvider';

console.log(`[+] 🚀 redable-extensions from foreground with ${SERVER_HOST}`);

ReactDOM.render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
  document.getElementById('root')
);
