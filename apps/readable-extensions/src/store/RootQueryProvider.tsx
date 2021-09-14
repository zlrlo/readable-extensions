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
  interests?: {
    createdAt: string;
    deletedAt: string;
    id: string;
    interest: string;
    updatedAt: string;
    userId: string;
  }[];
  tags?: string[];
};

type FormData = {
  interest: string;
  tags: { name: string }[];
};

type RootQueryType = {
  currentUrlData: UrlData;
  isLoading: boolean;
  userData: UserData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const RootQueryContext = React.createContext<RootQueryType>(null);

export const RootQueryProvider = ({ children }: AuthProviderProps) => {
  const { auth } = useAuthState();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [currentUrlData, setCurrenUrlData] = useState<UrlData>();
  const [userData, setUserData] = useState<UserData>();
  const [formData, setFormData] = useState<FormData>();

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
        }

        if (content) {
          const { urlInfo, userBookmark } = content;

          const { siteName, title, type, imageUrl, url, howMany } = urlInfo;
          const { interests, tags } = userBookmark ?? { interests: [], tags: [] };

          setCurrenUrlData({
            siteName: siteName ?? '',
            title: title ?? '',
            type: type ?? '',
            imageUrl: imageUrl ?? '',
            url: url ?? '',
            howMany: howMany ?? 0,
          });

          setUserData({
            interests: interests ?? [],
            tags: tags ?? [],
          });
        }

        setLoading(false);
      })();
    });
  }, [auth.token]);

  useEffect(() => {
    if (!formData || !currentUrlData) return;

    (async () => {
      fetch(REST_API.bookmarks.add, {
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
          // window.close();
          console.log('TCL: response', response);
        })
        .catch(error => {
          console.log(error);
        });
    })();
  }, [formData, auth.token, currentUrlData]);

  return (
    <RootQueryContext.Provider value={{ currentUrlData, isLoading, userData, setFormData }}>
      {children}
    </RootQueryContext.Provider>
  );
};

export const useCurrentSiteInfoState = () => {
  return useContext(RootQueryContext);
};
