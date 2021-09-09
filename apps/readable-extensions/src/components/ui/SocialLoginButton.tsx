import { authSignin } from '@extensions/src/auth';
import { API_REST_BASE } from '@extensions/src/const/api';
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
      <a href={`${API_REST_BASE}/auth/extension-facebook`} target="_blank" rel="noreferrer">
        <FacebookLoginButton />
      </a>
    );
  }

  if (provider === 'github') {
    return (
      <a href={`${API_REST_BASE}/auth/extension-github`} target="_blank" rel="noreferrer">
        <GithubLoginButton />
      </a>
    );
  }

  return null;
}
