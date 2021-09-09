import { useAuthState } from '@extensions/src/store/RootProvider';
import { useEffect, useState } from 'react';

export enum UseFetchMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Props = {
  url: string;
  method: UseFetchMethod;
  body?: any;
};

const useFetch = ({ url, method, body }: Props) => {
  const { auth } = useAuthState();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(body),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(JSON.stringify(myJson));
        setData(myJson);
        setLoading(false);
      })
      .catch(function (error) {
        setError(true);
        setLoading(false);
      });
  }, [auth.token, body, method, url]);

  return { data, loading, error };
};

export default useFetch;
