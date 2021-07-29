import { URL_SAVE_BOOKMARK } from '@extensions/src/const/api';
import config from '@extensions/website-config';
import React, { useState } from 'react';

const Connect = ({ authToken }) => {
  const onClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      (async () => {
        fetch(URL_SAVE_BOOKMARK, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ url }),
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
        Readable it
      </button>
    </div>
  );
};

export default Connect;
