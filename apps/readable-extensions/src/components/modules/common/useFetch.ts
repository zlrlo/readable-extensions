import { useAuthState } from '@extensions/store/AuthProvider';
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

// TODO(zlrlo): 한방 쿼리 할 것이기 때문에 곧 사라질 코드

const useFetch = ({ url, method, body }: Props) => {
  const { auth } = useAuthState();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify(body),
        });
        const serverData = await rawResponse.json();

        if (serverData.error) {
          throw `${serverData.error}`;
        } else {
          setLoading(false);
          setData(serverData);
        }
      } catch (err) {
        console.log('TCL: useFetch -> err', err);
      }
    })();
  }, []);

  return { data, loading };
};

export default useFetch;
