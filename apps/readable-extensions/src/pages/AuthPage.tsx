import React from 'react';
import MainPage from '@extensions/src/components/templates/MainPage';

const AuthPage = ({ authToken }) => {
  return (
    <div className="grid grid-cols-1 w-80">
      <MainPage authToken={authToken} />
    </div>
  );
};

export default AuthPage;
