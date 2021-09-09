import React from 'react';
import 'tailwindcss/tailwind.css';
import { SocialLoginButton } from '../components/ui/SocialLoginButton';

const LoginPage = () => {
  return (
    <div className="grid grid-cols-1 w-80">
      <SocialLoginButton provider="google" />;
    </div>
  );
};

export default LoginPage;
