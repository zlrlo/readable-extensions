import React from 'react';
import Chip from '@extensions/src/components/elements/Chip';

function HashTagInput() {
  return (
    <>
      <div className="flex">
        <input
          className="border-b-2 w-full"
          placeholder="Input..."
          onChange={() => {
            const test = 1;
          }}
        />
      </div>

      {/* TODO(지은): ul 태그로 변경 */}
      <div className="flex space-x-2 mb-4 text-sm font-medium">
        <Chip backgroundColor="bg-yellow-200" fontColor="text-black">
          #dev
        </Chip>
        <Chip backgroundColor="bg-purple-600" fontColor="text-white">
          #life
        </Chip>
        <Chip backgroundColor="bg-green-300" fontColor="text-black">
          #study
        </Chip>
        <Chip backgroundColor="bg-indigo-300" fontColor="text-black">
          #favorites
        </Chip>
      </div>
    </>
  );
}

export default HashTagInput;
