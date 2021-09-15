import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from './AuthProvider';
import { REST_API } from '@extensions/const/api';

type AuthProviderProps = {
  children: React.ReactNode;
};

type UrlData = {
  url: string;
  siteName: string;
  type: string;
  title: string;
  imageUrl: string;
  howMany: number;
};

type UserData = {
  interests?: { id: string; name: string }[];
  selectedInterest?: string;
  tags?: { id: string; name: string }[];
};

type FormData = {
  interest: string;
  tags: { name: string }[];
};

type RootQueryType = {
  currentUrlData: UrlData;
  isLoading: boolean;
  userData: UserData;
  submitData: (data: FormData) => void;
};

const RootQueryContext = React.createContext<RootQueryType>(null);

export const RootQueryProvider = ({ children }: AuthProviderProps) => {
  const { auth } = useAuthState();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentUrlData, setCurrenUrlData] = useState<UrlData>();
  const [userData, setUserData] = useState<UserData>();
  const [formData, setFormData] = useState<FormData>();

  const submitData = (data: FormData) => {
    setFormData(data);
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      (async () => {
        const rawResponse = await fetch(REST_API.urlInfo.get, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ url }),
        });

        const content = await rawResponse.json();
        console.log('TCL: RootQueryProvider -> content', content);

        if (content.statusCode === 500) {
          alert(content.message);
          window.close();
          return;
        }

        if (content) {
          const { urlInfo, userBookmark, interests, latestInterest } = content;

          const tagData = userBookmark?.tags.map(({ id, tag }) => {
            return { id, name: tag };
          });

          const interestData = interests?.map(({ id, interest }) => {
            return { id, name: interest };
          });

          setCurrenUrlData({
            siteName: urlInfo?.siteName ?? '',
            title: urlInfo?.title ?? '',
            type: urlInfo?.type ?? '',
            imageUrl: urlInfo?.imageUrl ?? '',
            url: urlInfo.url ?? '',
            howMany: urlInfo.howMany ?? 0,
          });

          setUserData({
            interests: interestData ?? [],
            selectedInterest: userBookmark?.interest.interest,
            tags: tagData ?? [],
          });
        }

        setLoading(false);
      })();
    });
  }, [auth.token]);

  useEffect(() => {
    if (!formData || !currentUrlData) return;

    (async () => {
      fetch(REST_API.userBookmark.add, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          url: currentUrlData.url,
          interest: formData.interest,
          tags: formData.tags.map(({ name }) => name),
        }),
      })
        .then(response => {
          // Unauthorizaed
          if (response.status === 401) {
            chrome.storage.local.remove('authToken', function () {
              const error = chrome.runtime.lastError;
              if (error) {
                alert(error.message);
              } else {
                alert('Please login again.');
              }
            });
          }
          // normal case
          alert('It has been successfully saved');
          window.close();
        })
        .catch(error => {
          console.log(error);
        });
    })();
  }, [formData, auth.token, currentUrlData]);

  return (
    <RootQueryContext.Provider value={{ currentUrlData, isLoading, userData, submitData }}>
      {children}
    </RootQueryContext.Provider>
  );
};

export const useCurrentSiteInfoState = () => {
  return useContext(RootQueryContext);
};
