console.log('[+] 🚀 redable-extensions from background.');

// chrome.browserAction.onClicked.addListener(function () {
//   // event listener
//   chrome.storage.local.get('authToken', function (data) {
//     if (data) {
//     }
//   });
// });

const App = require('./pages');
const Login = require('./pages/login');
const ReactDOM = require('react-dom');

chrome.storage.local.get('authToken', function (data) {
  if (data) {
    ReactDOM.render(<App />, document.getElementById('root'));
  } else {
    ReactDOM.render(<Login />, document.getElementById('root'));
  }
});
