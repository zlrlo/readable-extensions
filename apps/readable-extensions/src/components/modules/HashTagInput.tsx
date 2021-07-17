import React, { useState } from 'react';
import Chip from '@extensions/src/components/elements/Chip';
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
      <div className="flex items-center">
        <HashtagIcon className="flex-none w-5 h-5 text-gray-500"></HashtagIcon>
        <input
          className="border-b w-full focus:ring-2 focus:ring-blue-600 p-2 rounded-md"
          placeholder="Focus me"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </div>

      <ul className="flex flex-wrap mb-4 text-sm font-medium">
        {hashTagList.map(({ id, hashTag }) => {
          return (
            <li className="flex mr-2 mb-1">
              <Chip key={id} backgroundColor="bg-yellow-200" fontColor="text-black">
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
