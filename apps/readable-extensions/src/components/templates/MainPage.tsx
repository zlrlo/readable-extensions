import React, { useState } from 'react';
import OpenGraphImage from '@extensions/src/components/elements/OpenGraphImage';
import Connect from '@extensions/src/components/modules/Connect';
import HashTagInput from '@extensions/src/components/modules/HashTagInput';
import SiteInfo from '@extensions/src/components/modules/SiteInfo';
import TextAreaAboveImage from '@extensions/src/components/modules/TextAreaAboveImage';
import CategorySelect from '@extensions/src/components/modules/CategorySelect';
import config from '@extensions/website-config';
import { GET_URL_INFO } from '@extensions/src/const/api';

export type UrlInfo = {
  url: string;
  siteName: string;
  type: string;
  title: string;
  imageUrl: string;
  howMany: number;
};

const MainPage = ({ authToken }) => {
  const defaultUrlInfo: UrlInfo = {
    url: '',
    siteName: '',
    type: '',
    imageUrl: config.coverImage,
    title: '',
    howMany: 0,
  };

  const [loaded, setLoaded] = useState(false);
  const [urlInfo, setUrlInfo] = useState<UrlInfo>(defaultUrlInfo);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = tabs[0].url;

    (async () => {
      if (!loaded) {
        const rawResponse = await fetch(GET_URL_INFO, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ url }),
        });
        const content = await rawResponse.json();
        console.log('TCL: MainPage -> content', JSON.stringify(content, null, 2));

        if (content) {
          setLoaded(true);

          const { siteName, title, type, imageUrl, url, howMany } = content;
          const {
            siteName: siteNameDefault,
            title: titleDefault,
            type: typeDefault,
            imageUrl: imageUrlDefault,
            url: urlDefault,
            howMany: howManyDefault,
          } = defaultUrlInfo;

          setUrlInfo({
            siteName: siteName ?? siteNameDefault,
            title: title ?? titleDefault,
            type: type ?? typeDefault,
            imageUrl: imageUrl ?? imageUrlDefault,
            url: url ?? urlDefault,
            howMany: howMany ?? howManyDefault,
          });
        }
      }
    })();
  });

  return (
    <div className="grid grid-cols-1 w-80">
      <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
        <TextAreaAboveImage urlInfo={urlInfo}></TextAreaAboveImage>
      </div>

      <div className="col-start-1 row-start-2 px-4">
        <SiteInfo urlInfo={urlInfo} />
      </div>

      <div className="col-start-1 row-start-3 space-y-3 px-4 pb-4">
        <CategorySelect />
        <HashTagInput />
        <Connect authToken={authToken} />
      </div>

      <div className="relative col-start-1 row-start-1">
        <OpenGraphImage src={urlInfo.imageUrl}></OpenGraphImage>
      </div>
    </div>
  );
};

export default MainPage;
