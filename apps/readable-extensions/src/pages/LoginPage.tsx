import React from 'react';
import LoginCoverImage from '@extensions/assets/images/login_cover.svg';
import Logo from '@extensions/components/ui/Logo';
import TextLogo from '@extensions/components/ui/TextLogo';
import { SocialLoginButton } from '@extensions/components/ui/SocialLoginButton';

const LoginPage = () => {
  return (
    <div className="flex">
      <div className="border-2 h-96 w-80">
        <img src={LoginCoverImage} alt="Login" className="object-cover w-full h-full" />
      </div>
      <div className="flex flex-col justify-center px-7">
        <TextLogo renderLogo={() => <Logo />} />

        <div className="mt-4 text-lg font-medium text-gray-500">Read and share anything readable in ‘Readable’</div>

        <div className="w-64 mt-14">
          <SocialLoginButton provider="google" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
