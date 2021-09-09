import React, { useState } from 'react';
import Chip from '@extensions/src/components/ui/Chip';
import { HashtagIcon, BackspaceIcon } from '@heroicons/react/solid';
import uuid from 'react-uuid';

const HashTagInput = () => {
  const [inputText, setInputText] = useState('');
  const [hashTagList, setHashTagList] = useState([]);

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setHashTagList([...hashTagList, { id: uuid(), hashTag: inputText }]);
      setInputText('');
    }
  };

  const deleteHashTag = hashTagId => {
    const filtered = hashTagList.filter(({ id }) => id !== hashTagId);
    console.log('TCL: HashTagInput -> filtered', filtered);
    setHashTagList(filtered);
  };

  return (
    <>
      <div className="flex items-center text-gray-400 focus-within:text-gray-600">
        <HashtagIcon className="flex-none w-5 h-5"></HashtagIcon>
        <input
          className="border-b w-full focus:outline-none p-2"
          placeholder="Focus me"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <ul className="flex flex-wrap mb-4 text-sm font-medium max-h-32 overflow-y-auto">
        {hashTagList.map(({ id, hashTag }) => {
          return (
            <li key={id} className="flex mr-2 mb-1">
              <Chip backgroundColor="bg-yellow-200" fontColor="text-black">
                #{hashTag}
              </Chip>
              <button
                className="ml-1"
                onClick={() => {
                  deleteHashTag(id);
                }}
              >
                <BackspaceIcon className="w-5 h-5 text-gray-300 hover:text-gray-500"></BackspaceIcon>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default HashTagInput;
