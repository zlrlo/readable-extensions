import React from 'react';

type Props = {
  type: string;
  siteName: string;
};

const TextAreaAboveImage = ({ type, siteName }: Props) => {
  return (
    <>
      <p className="text-sm font-medium text-white">{type}</p>
      <h2 className="text-xl font-semibold text-white">{siteName}</h2>
    </>
  );
};

export default TextAreaAboveImage;
