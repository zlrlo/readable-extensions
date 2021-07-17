import React from 'react';

type Props = {
  src: string;
};

const OpenGraphImage = (props: Props) => {
  const { src } = props;

  return (
    <img
      src={src}
      alt="open-graph image"
      className="absolute inset-0 w-full h-full object-cover bg-gray-100 sm:rounded-lg"
    />
  );
};

export default OpenGraphImage;
