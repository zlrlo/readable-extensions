import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from './AuthProvider';
import { REST_API } from '@extensions/const/api';

type AuthProviderProps = {
  children: React.ReactNode;
};

type UrlInfo = {
  url: string;
  siteName: string;
  type: string;
  title: string;
  imageUrl: string;
  howMany: number;
  interests?: { id: string; interest: string }[];
  tags?: { id: string; tag: string };
};

const RootQueryContext = React.createContext(null);

export const RootQueryProvider = ({ children }: AuthProviderProps) => {
  const { auth } = useAuthState();

  const [currentSiteInfo, setCurrentSiteInfo] = useState<UrlInfo | null>(null);
  const [isCurrentSiteInfoLoading, setCurrentSiteInfoLoading] = useState<boolean>(false);

  // TODO(zlrlo): 서버 데이터 맞춘 후 제거 예정
  const [saveState, setSaveState] = useState(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      (async () => {
        const rawResponse = await fetch(REST_API.bookmarks.getUrlInfo, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ url }),
        });

        const content = await rawResponse.json();

        if (content) {
          const { siteName, title, type, imageUrl, url, howMany, interests, tags } = content;

          setCurrentSiteInfo({
            siteName: siteName ?? '',
            title: title ?? '',
            type: type ?? '',
            imageUrl: imageUrl ?? '',
            url: url ?? '',
            howMany: howMany ?? 0,
            interests: interests ?? null,
            tags: tags ?? null,
          });
        }

        setCurrentSiteInfoLoading(false);
      })();
    });
  }, [auth.token]);

  useEffect(() => {
    if (!currentSiteInfo) return;
    if (!saveState) return;

    (async () => {
      fetch(REST_API.bookmarks.add, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ url: currentSiteInfo.url }),
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
          window.close();
        })
        .catch(error => {
          console.log(error);
        });
    })();
  }, [auth.token, saveState, currentSiteInfo]);

  return (
    <RootQueryContext.Provider value={{ currentSiteInfo, setCurrentSiteInfo, isCurrentSiteInfoLoading, setSaveState }}>
      {children}
    </RootQueryContext.Provider>
  );
};

export const useCurrentSiteInfoState = () => {
  const { currentSiteInfo, setCurrentSiteInfo, isCurrentSiteInfoLoading, setSaveState } = useContext(RootQueryContext);

  return { currentSiteInfo, setCurrentSiteInfo, isCurrentSiteInfoLoading, setSaveState };
};
