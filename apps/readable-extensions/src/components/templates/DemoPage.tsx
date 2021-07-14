import React from 'react';
import HashTagInput from '@extensions/src/components/modules/HashTagInput';
import OpenGraphImage from '@extensions/src/components/modules/OpenGraphImage';
import CategorySelect from '@extensions/src/components/modules/CategorySelect';
import Uncategorized from '@extensions/src/components/modules/Uncategorized';

export default function DemoPage() {
  return (
    <main>
      <div className="flex">
        <OpenGraphImage />
        <form className="flex-auto p-6 space-y-4 w-80">
          <Uncategorized />
          <CategorySelect />
          <HashTagInput />
          <p className="text-sm text-gray-500">https://readable-2021.vercel.app</p>
        </form>
      </div>
    </main>
  );
}
