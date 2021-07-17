import { BookmarkIcon } from '@heroicons/react/solid';
import React from 'react';

type Props = {
  url: string;
};

const SiteInfo = (props: Props) => {
  const { url } = props;

  return (
    <div className="flex items-center text-sm font-medium my-5">
      <BookmarkIcon className="flex-none w-5 h-5 text-blue-500"></BookmarkIcon>
      <div className="ml-1">
        <span className="text-black">4.9k</span>
      </div>
      <div className="text-base font-normal mx-2">·</div>
      <div className="truncate">{url}</div>
    </div>
  );
};

export default SiteInfo;
