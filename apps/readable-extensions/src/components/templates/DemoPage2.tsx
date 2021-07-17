import { BookmarkIcon, HashtagIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import HashTagInput from '../modules/HashTagInput';

type MetaData = {
  image: string;
  siteName: string;
};

const DemoPage2 = () => {
  const defaultMetaData: MetaData = {
    image: 'https://user-images.githubusercontent.com/68647194/125168170-056e3f80-e1df-11eb-8af8-de5395e38480.JPG',
    siteName: 'Site name',
  };

  const [metaData, setMetaData] = useState(defaultMetaData);

  const [url, setUrl] = useState('');

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === 'og') {
      setUrl(sender.tab.url);
      setMetaData(request.metaData);
      sendResponse({ farewell: 'goodbye' });
    }
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['content-script.js'],
      });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 w-80">
      <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
        {/* 이미지 위 글씨 영역 */}
        <p className="text-sm font-medium text-white">READABLE</p>
        <h2 className="text-xl font-semibold text-white">{metaData.siteName}</h2>
      </div>

      <div className="col-start-1 row-start-2 px-4">
        {/* 이미지 아래 글씨 영역 */}
        <div className="flex items-center text-sm font-medium my-5">
          <BookmarkIcon className="flex-none w-5 h-5 text-blue-500"></BookmarkIcon>
          <div className="ml-1">
            <span className="text-black">4.9k</span>
          </div>
          <div className="text-base font-normal mx-2">·</div>
          <div className="truncate">{url}</div>
        </div>

        <hr className="w-16 border-gray-300 hidden sm:block" />
      </div>

      <div className="col-start-1 row-start-3 space-y-3 px-4 pb-4">
        {/* 이미지 아래 글씨 영역2 + 버튼 */}
        <HashTagInput />
        <div className="flex items-end">
          <a href="" className="text-gray-400 hover:text-blue-600">
            Go to the Readable
          </a>
          <button
            type="button"
            className="bg-indigo-100 text-indigo-700 text-base font-semibold px-6 py-2 rounded-lg ml-auto"
          >
            Save readable
          </button>
        </div>
      </div>

      <div className="relative col-start-1 row-start-1">
        {/* 반응형 이미지 영역 */}
        <img
          src={metaData.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
        />
      </div>
    </div>
  );
};

export default DemoPage2;
