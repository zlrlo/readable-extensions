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
  token?: string;
  body?: any;
};

const useFetch = ({ url, method, token, body }: Props) => {
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
        Authorization: `Bearer ${token}`,
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
  }, [url, method, token, body]);

  return { data, loading, error };
};

export default useFetch;
