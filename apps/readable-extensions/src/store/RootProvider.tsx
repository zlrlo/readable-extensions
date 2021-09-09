import React, { useContext, useEffect } from 'react';
import { useReducer } from 'react';
import authReducer from './authReducer';

type RootStoreProps = {
  children: React.ReactNode;
};

const AuthContext = React.createContext(null);

export const RootProvider = ({ children }: RootStoreProps) => {
  const [auth, authDispatch] = useReducer(authReducer, { token: '' });

  useEffect(() => {
    chrome.storage.local.get('authToken', function (data) {
      const { authToken } = data;
      authDispatch({ type: 'LOGIN', token: authToken });
    });
  }, []);

  return <AuthContext.Provider value={{ auth, authDispatch }}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  const { auth, authDispatch } = useContext(AuthContext);

  if (!auth) throw new Error('Cannot find RootProvider');

  return { auth, authDispatch };
};
