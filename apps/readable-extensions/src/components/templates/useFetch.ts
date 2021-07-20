import { URL_SAVE_BOOKMARK } from '@extensions/src/const/api';
import { useEffect, useState } from 'react';

type Data = {
  url: string;
};

type Props = {
  data: Data;
};

const useFetch = (props: Props) => {
  console.log('TCL: URL_SAVE_BOOKMARK', URL_SAVE_BOOKMARK);
  const { data } = props;

  const [loading, setLoading] = useState(false);

  const getMetaData = () => {
    setLoading(true);

    fetch(`${URL_SAVE_BOOKMARK}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log(JSON.stringify(myJson));
        setLoading(false);
      });
  };

  useEffect(() => {
    getMetaData();
  }, []);

  return loading;
};

export default useFetch;
