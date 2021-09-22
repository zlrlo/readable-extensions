import { useAuthState } from '@extensions/store/AuthProvider';
import { useCallback, useEffect, useState } from 'react';

type useFetchProps = {
  variables: {
    api: string;
    data: any;
  };
  skip: boolean;
};

const useFetch = ({ variables, skip }: useFetchProps): { isLoading: boolean; responseData: any } => {
  const { auth } = useAuthState();
  const [isLoading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState<any>();

  const makeRequest = useCallback(async () => {
    const { api, data } = variables;
    setLoading(true);

    const rawResponse = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(data),
    });

    const response = await rawResponse.json();

    if (response.statusCode === 500) {
      throw new Error(response.message);
    }

    if (response.statusCode === 401) {
      chrome.storage.local.remove('authToken', function () {
        const error = chrome.runtime.lastError;
        if (error) {
          throw new Error(error.message);
        } else {
          throw new Error('Please login again.');
        }
      });
    }

    if (response) {
      setResponseData(response);
    }

    setLoading(false);
  }, [auth.token, variables]);

  useEffect(() => {
    if (skip) {
      return;
    }

    makeRequest().catch(err => {
      console.log(err);
      alert(err);
      window.close();
    });
  }, [skip]);

  return { isLoading, responseData };
};

export default useFetch;
