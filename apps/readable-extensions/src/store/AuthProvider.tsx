import React, { useContext, useEffect, useState } from 'react';
import { useReducer } from 'react';
import authReducer, { AuthState } from './authReducer';

type AuthProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  auth: AuthState;
  isLoading: boolean;
};

const AuthContext = React.createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, authDispatch] = useReducer(authReducer, { token: '' });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get('authToken', function (data) {
      if (data.authToken) {
        authDispatch({ type: 'LOGIN', token: data.authToken });
      }
      setLoading(false);
    });
  }, []);

  return <AuthContext.Provider value={{ auth, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => {
  return useContext(AuthContext);
};
