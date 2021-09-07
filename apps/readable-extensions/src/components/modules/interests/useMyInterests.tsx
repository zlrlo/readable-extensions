import { REST_API } from '@extensions/src/const/api';
import { useEffect, useState } from 'react';

type InterestData = {
  id: string;
  interest: string;
};

type Props = {
  authToken: string;
};

const useMyInterests = ({ authToken }: Props) => {
  const [loading, setLoading] = useState(false);
  const [interests, setInterests] = useState<InterestData[]>([]);

  const getMyInterests = async () => {
    setLoading(true);

    fetch(`${REST_API.interests.myInterests}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(JSON.stringify(json));
        setLoading(false);
      });
  };

  useEffect(() => {
    getMyInterests();
  });

  return interests;
};

export default useMyInterests;
