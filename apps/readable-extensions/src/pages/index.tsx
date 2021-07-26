import React from 'react';
import styled from 'styled-components';
import 'tailwindcss/tailwind.css';
import MainPage from '@extensions/src/components/templates/MainPage';
import LoginPage from '@extensions/src/components/templates/LoginPage';

const App = () => {
  console.log('[+] foreground ');

  const isLoggedIn = false;

  return (
    <div className="grid grid-cols-1 w-80">
      {isLoggedIn && <MainPage />}
      {!isLoggedIn && <LoginPage />}
    </div>
  );
};

export default App;
