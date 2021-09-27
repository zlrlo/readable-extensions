import { authSignin } from '@extensions/auth';
import { REST_API_BASE } from '@extensions/const/api';
import React from 'react';
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';

interface Props {
  provider: string;
}

export function SocialLoginButton({ provider }: Props) {
  if (provider === 'google') {
    return <GoogleLoginButton onClick={authSignin} />;
  }

  if (provider === 'facebook') {
    return (
      <a href={`${REST_API_BASE}/auth/extension-facebook`} target="_blank" rel="noreferrer">
        <FacebookLoginButton />
      </a>
    );
  }

  if (provider === 'github') {
    return (
      <a href={`${REST_API_BASE}/auth/extension-github`} target="_blank" rel="noreferrer">
        <GithubLoginButton />
      </a>
    );
  }

  return null;
}
