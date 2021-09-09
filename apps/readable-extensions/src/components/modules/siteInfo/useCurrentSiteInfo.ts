import { useEffect, useState } from 'react';
import { REST_API } from '@extensions/const/api';
import { useAuthState } from '@extensions/store/RootProvider';

type UrlInfo = {
  url: string;
  siteName: string;
  type: string;
  title: string;
  imageUrl: string;
  howMany: number;
};

const useCurrentSiteInfo = () => {
  const { auth } = useAuthState();

  const [currentSiteInfo, setCurrentSiteInfo] = useState<UrlInfo>({
    url: '',
    siteName: '',
    type: '',
    title: '',
    imageUrl: '',
    howMany: 0,
  });

  const [isCurrentSiteInfoLoading, setCurrentSiteInfoLoading] = useState<boolean | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      (async () => {
        setCurrentSiteInfoLoading(true);

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
          const { siteName, title, type, imageUrl, url, howMany } = content;

          setCurrentSiteInfo({
            siteName: siteName ?? '',
            title: title ?? '',
            type: type ?? '',
            imageUrl: imageUrl ?? '',
            url: url ?? '',
            howMany: howMany ?? 0,
          });

          setCurrentSiteInfoLoading(false);
        }
      })();
    });
  }, [auth.token]);

  return { currentSiteInfo, isCurrentSiteInfoLoading };
};

export default useCurrentSiteInfo;
