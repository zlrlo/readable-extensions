const ogImage = document.querySelector('meta[property~="og:image"]');
const ogImageContent = ogImage && ogImage.getAttribute('content');

chrome.runtime.sendMessage({ greeting: 'og', ogImageContent: ogImageContent }, function (response) {
  console.log(response.farewell);
});
