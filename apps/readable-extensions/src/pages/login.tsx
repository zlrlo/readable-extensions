import React from 'react';
import 'tailwindcss/tailwind.css';
import LoginPage from '@extensions/src/components/templates/LoginPage';

const Login = () => {
  return (
    <div className="grid grid-cols-1 w-80">
      <LoginPage />
    </div>
  );
};

export default Login;
