import React from 'react';
import useCurrentSiteInfo from '@extensions/components/modules/siteInfo/useCurrentSiteInfo';
import LottiePlayer from '@extensions/components/ui/LottiePlayer';
import TextAreaAboveImage from '@extensions/components/ui/TextAreaAboveImage';
import UrlInfo from '@extensions/components/ui/SiteInfo';
import Interests from '@extensions/components/modules/Interests/Interests';
import HashTagInput from '@extensions/components/ui/HashTagInput';
import config from '@extensions/const/website-config';
import useSubmit from '@extensions/components/modules/submit/useSubmit';
import OpenGraphImage from '@extensions/components/ui/OpenGraphImage';

const MainPage = () => {
  const { currentSiteInfo, isCurrentSiteInfoLoading } = useCurrentSiteInfo();
  const { onSubmit } = useSubmit();

  if (isCurrentSiteInfoLoading) {
    return <LottiePlayer />;
  }

  const { type, siteName, title, howMany, imageUrl } = currentSiteInfo;

  return (
    <div className="grid grid-cols-1 w-80">
      <div className="grid grid-cols-1 w-80">
        <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
          <TextAreaAboveImage type={type} siteName={siteName}></TextAreaAboveImage>
        </div>

        <div className="col-start-1 row-start-2 px-4">
          <UrlInfo title={title} howMany={howMany} />
        </div>

        <div className="col-start-1 row-start-3 space-y-3 px-4 pb-4">
          <Interests />
          <HashTagInput />
          <div className="flex items-end">
            <a href={config.siteUrl} target="_blank" className="text-gray-400 hover:text-blue-600" rel="noreferrer">
              Go to the Readable
            </a>
            <button
              type="button"
              className="bg-indigo-100 text-indigo-700 text-base font-semibold px-6 py-2 rounded-lg ml-auto disabled:opacity-50"
              onClick={onSubmit}
            >
              Readable it
            </button>
          </div>
        </div>

        <div className="relative col-start-1 row-start-1">
          <OpenGraphImage src={imageUrl}></OpenGraphImage>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
