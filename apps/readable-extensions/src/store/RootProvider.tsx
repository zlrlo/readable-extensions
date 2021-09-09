import React, { useContext, useEffect, useState } from 'react';
import { useReducer } from 'react';
import authReducer from './authReducer';

type RootStoreProps = {
  children: any;
};

const AuthContext = React.createContext(null);

export const RootProvider = ({ children }: RootStoreProps) => {
  const [isAppLoading, setAppLoading] = useState(false);
  const [auth, authDispatch] = useReducer(authReducer, { token: '' });

  useEffect(() => {
    chrome.storage.local.get('authToken', function (data) {
      const { authToken } = data;
      authDispatch({ type: 'LOGIN', token: authToken });
    });
  }, []);

  return <AuthContext.Provider value={{ auth, authDispatch, isAppLoading }}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  const { auth, authDispatch, isAppLoading } = useContext(AuthContext);

  if (!auth) throw new Error('Cannot find RootProvider');

  return { auth, authDispatch, isAppLoading };
};
