import { useEffect, useState } from 'react';

function Uncategorized() {
  const [url, setUrl] = useState('');

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === 'og') {
      setUrl(sender.tab.url);
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
    <div className="flex flex-wrap">
      <h1 className="flex-auto text-xl font-semibold">READABLE</h1>
      <div className="text-xl font-semibold text-gray-500">Save</div>
      <div className="w-full flex-none text-sm font-medium text-gray-500 mt-2 truncate">{url}</div>
    </div>
  );
}

export default Uncategorized;
