import React from 'react';
import LoginCoverImage from '@extensions/assets/images/login_cover.svg';
import { SocialLoginButton } from '@extensions/components/ui/SocialLoginButton';

const LoginPage = () => {
  return (
    <div className="p-5">
      <div className="w-96 h-56">
        <img src={LoginCoverImage} alt="Welcome Readable" className="object-cover w-full h-full" />
      </div>
      <div className="mt-5">
        <SocialLoginButton provider="google" />
      </div>
    </div>
  );
};

export default LoginPage;
