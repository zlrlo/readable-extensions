// const axios = require('axios');

export const authSignin = () => {
  chrome.identity.getAuthToken(
    {
      interactive: true,
    },
    function (token) {
      if (chrome.runtime.lastError) {
        alert(chrome.runtime.lastError.message);
        return;
      }

      fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`)
        .then(response => response.json())
        .then(response => {
          console.log(response);
          alert(JSON.stringify(response));

          (async () => {
            const rawResponse = await fetch('http://localhost:7000/rest/auth/signin', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ signinInput: response }),
            });
            const content = await rawResponse.json();

            const { token } = content;

            console.log(content);
            alert(JSON.stringify(content));

            if (token) {
              chrome.storage.local.set({
                authToken: token,
              });
            }
          })();
        });
    }
  );
};
