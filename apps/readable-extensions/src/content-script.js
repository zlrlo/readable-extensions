const getMetaData = () => {
  const og = {};

  const image = document.querySelector('meta[property~="og:image"]');
  const imageContent = image && image.getAttribute('content');
  og['image'] = imageContent;

  const siteName = document.querySelector('meta[property~="og:site_name"]');
  const siteNameContent = siteName && siteName.getAttribute('content');
  og['siteName'] = siteNameContent;

  return og;
};

chrome.runtime.sendMessage({ greeting: 'og', metaData: getMetaData() }, function (response) {
  console.log(response.farewell);
});
