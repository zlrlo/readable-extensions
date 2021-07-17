import React, { useEffect, useState } from 'react';
import OpenGraphImage from '@extensions/src/components/elements/OpenGraphImage';
import Connect from '@extensions/src/components/modules/Connect';
import HashTagInput from '@extensions/src/components/modules/HashTagInput';
import SiteInfo from '@extensions/src/components/modules/SiteInfo';
import TextAreaAboveImage from '@extensions/src/components/modules/TextAreaAboveImage';
import CategorySelect from '@extensions/src/components/modules/CategorySelect';

type MetaData = {
  image: string;
  siteName: string;
};

const MainPage = () => {
  const defaultMetaData: MetaData = {
    image: 'https://user-images.githubusercontent.com/68647194/125168170-056e3f80-e1df-11eb-8af8-de5395e38480.JPG',
    siteName: 'Site name',
  };

  const [metaData, setMetaData] = useState(defaultMetaData);

  const [url, setUrl] = useState('');

  // chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  //   if (request.greeting === 'og') {
  //     setUrl(sender.tab.url);
  //     setMetaData(request.metaData);
  //     sendResponse({ farewell: 'goodbye' });
  //   }
  // });

  useEffect(() => {
    // chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    //   chrome.scripting.executeScript({
    //     target: { tabId: tabs[0].id },
    //     files: ['content-script.js'],
    //   });
    // });
  }, []);

  return (
    <div className="grid grid-cols-1 w-80">
      <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
        <TextAreaAboveImage siteName={metaData.siteName}></TextAreaAboveImage>
      </div>

      <div className="col-start-1 row-start-2 px-4">
        <SiteInfo url={url} />
      </div>

      <div className="col-start-1 row-start-3 space-y-3 px-4 pb-4">
        <CategorySelect />
        <HashTagInput />
        <Connect />
      </div>

      <div className="relative col-start-1 row-start-1">
        <OpenGraphImage src={metaData.image}></OpenGraphImage>
      </div>
    </div>
  );
};

export default MainPage;
