import config from '@extensions/website-config';
import React from 'react';

type Props = {
  siteName: string;
};

const TextAreaAboveImage = (props: Props) => {
  const { siteName } = props;

  return (
    <>
      <p className="text-sm font-medium text-white">{config.title.toUpperCase()}</p>
      <h2 className="text-xl font-semibold text-white">{siteName}</h2>
    </>
  );
};

export default TextAreaAboveImage;
