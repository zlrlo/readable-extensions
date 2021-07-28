import React from 'react';
import 'tailwindcss/tailwind.css';
import MainPage from '@extensions/src/components/templates/MainPage';

const AuthPage = ({ authToken }) => {
  return (
    <div className="grid grid-cols-1 w-80">
      <MainPage authToken={authToken} />
    </div>
  );
};

export default AuthPage;
