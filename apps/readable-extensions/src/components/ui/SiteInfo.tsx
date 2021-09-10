import { BookmarkIcon } from '@heroicons/react/solid';
import React from 'react';

type Props = {
  title: string;
  howMany: number;
};

const SiteInfo = ({ title, howMany }: Props) => {
  return (
    <div className="flex items-center text-sm font-medium my-5">
      <span className="flex-none">
        <BookmarkIcon className="w-5 h-5 text-blue-500"></BookmarkIcon>
      </span>
      <div className="ml-1">
        <span className="text-black">{howMany}</span>
      </div>
      <div className="text-base font-normal mx-2">·</div>
      <div>{title}</div>
    </div>
  );
};

export default SiteInfo;
