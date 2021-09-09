import { REST_API } from '@extensions/const/api';
import { useAuthState } from '@extensions/store/RootProvider';

const useSubmit = () => {
  const { auth } = useAuthState();

  const onSubmit = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;

      (async () => {
        fetch(REST_API.bookmarks.add, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`,
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

  return { onSubmit };
};

export default useSubmit;
