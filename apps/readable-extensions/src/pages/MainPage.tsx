import React from 'react';
import LottiePlayer from '@extensions/components/ui/LottiePlayer';
import TextAreaAboveImage from '@extensions/components/ui/TextAreaAboveImage';
import UrlInfo from '@extensions/components/ui/SiteInfo';
import OpenGraphImage from '@extensions/components/ui/OpenGraphImage';
import { useCurrentSiteInfoState } from '@extensions/store/RootQueryProvider';
import Form from '@extensions/components/modules/form/Form';

const MainPage = () => {
  const { currentUrlData, isLoading, userData, submitData } = useCurrentSiteInfoState();

  if (!currentUrlData || !userData || isLoading) {
    return <LottiePlayer />;
  }

  const { type, siteName, title, howMany, imageUrl } = currentUrlData;

  return (
    <div className="grid grid-cols-1 w-80">
      <div className="grid grid-cols-1 w-80">
        <div className="relative z-10 col-start-1 row-start-1 px-4 pt-40 pb-3 bg-gradient-to-t from-black sm:bg-none">
          <TextAreaAboveImage type={type} siteName={siteName}></TextAreaAboveImage>
        </div>

        <div className="col-start-1 row-start-2 px-4">
          <UrlInfo title={title} howMany={howMany} />
        </div>

        <Form userData={userData} submitData={submitData} />

        <div className="relative col-start-1 row-start-1">
          <OpenGraphImage src={imageUrl}></OpenGraphImage>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
