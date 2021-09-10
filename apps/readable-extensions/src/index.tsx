import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { RootProvider } from '@extensions/store/RootProvider';
import App from '@extensions/app';
import { SERVER_HOST } from '@extensions/const/api';
import 'tailwindcss/tailwind.css';

console.log(`[+] 🚀 redable-extensions from foreground with ${SERVER_HOST}`);

ReactDOM.render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>,
  document.getElementById('root')
);
