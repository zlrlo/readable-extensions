import { useState } from 'react';

function OpenGraphImage() {
  const [imgSrc, setImgSrc] = useState(
    'https://user-images.githubusercontent.com/68647194/125168170-056e3f80-e1df-11eb-8af8-de5395e38480.JPG'
  );

  const [ogImage, setOGImage] = useState('');

  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.greeting === 'og') {
      setImgSrc(request.ogImageContent);
      sendResponse({ farewell: 'goodbye' });
    }
  });

  return (
    <div className="flex-none w-48 relative">
      <img src={imgSrc} alt="open-graph image" className="absolute inset-0 w-full h-full object-cover" />
    </div>
  );
}

export default OpenGraphImage;
