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
        });
    }
  );
};
