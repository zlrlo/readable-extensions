import config from '@extensions/website-config';
import React from 'react';
import { UrlInfo } from '../templates/MainPage';

type Props = {
  urlInfo: UrlInfo;
};

const TextAreaAboveImage = ({ urlInfo }: Props) => {
  const { type, siteName } = urlInfo;

  return (
    <>
      <p className="text-sm font-medium text-white">{type}</p>
      <h2 className="text-xl font-semibold text-white">{siteName}</h2>
    </>
  );
};

export default TextAreaAboveImage;
