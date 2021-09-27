import { REST_API_BASE } from './const/api';

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
          (async () => {
            const rawResponse = await fetch(`${REST_API_BASE}/auth/signin`, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                signinInput: {
                  provider: 'Google',
                  providerId: response.id,
                  email: response.email,
                  avatarUrl: response.picture,
                },
              }),
            });

            const content = await rawResponse.json();
            const { token } = content;

            if (token) {
              chrome.storage.local.set({
                authToken: token,
              });

              window.close();
              alert('Login successful! Please click readable icon again!');
            }
          })();
        });
    }
  );
};
