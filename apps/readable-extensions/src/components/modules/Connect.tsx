import config from '@extensions/website-config';
import React from 'react';

const Connect = () => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      // TODO(Teddy): WIP
      console.log('TCL: onClick -> url', url);
    });
  };

  return (
    <div className="flex items-end">
      <a href={config.siteUrl} target="_blank" className="text-gray-400 hover:text-blue-600" rel="noreferrer">
        Go to the Readable
      </a>
      <button
        type="button"
        className="bg-indigo-100 text-indigo-700 text-base font-semibold px-6 py-2 rounded-lg ml-auto"
        onClick={onClick}
      >
        Save readable
      </button>
    </div>
  );
};

export default Connect;
