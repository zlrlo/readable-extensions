import { URL_SAVE_BOOKMARK } from '@extensions/src/const/api';
import config from '@extensions/website-config';
import React, { useState } from 'react';

const Connect = ({ authToken }) => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      (async () => {
        const rawResponse = await fetch(URL_SAVE_BOOKMARK, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ url }),
        });
        const content = await rawResponse.json();
      })();
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
