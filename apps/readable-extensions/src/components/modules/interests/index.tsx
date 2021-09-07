import React, { useEffect, useState } from 'react';
import { FolderOpenIcon, SelectorIcon, FolderIcon, CheckIcon } from '@heroicons/react/outline';
import { REST_API } from '@extensions/src/const/api';
import useFetch, { UseFetchMethod } from '../../templates/useFetch';

const Interests = ({ authToken }: { authToken: string }) => {
  const { data, loading, error } = useFetch({
    url: REST_API.interests.myInterests,
    method: UseFetchMethod.GET,
    token: authToken,
  });

  const defaultInterest = [{ id: '0', interest: 'Readable' }];
  const interests = data?.length ? [...defaultInterest, ...data] : defaultInterest;

  const [selectedInterest, setSelectedInterest] = useState(interests[0]);
  const [expanded, setExpanded] = useState(false);

  const handleInterestListBoxClick = () => {
    setExpanded(!expanded);
  };

  const handleInterestListClick = ({ id, interest }) => {
    setSelectedInterest({ id, interest });
  };

  return (
    <div className="mt-1 relative">
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        aria-haspopup="listbox"
        aria-labelledby="listbox-label"
        onClick={handleInterestListBoxClick}
      >
        <span className="flex items-center">
          <FolderOpenIcon className="w-5 h-5" />
          <span className="ml-3 block truncate">{selectedInterest.interest}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon className="w-5 h-5" />
        </span>
      </button>
      {expanded && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-28 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {interests.map(({ id, interest }) => {
            const isSelected = selectedInterest.id === id ? true : false;

            return (
              <li
                key={id}
                className={`group cursor-default select-none relative py-2 pl-3 pr-9 hover:text-indigo-600 ${
                  isSelected ? 'text-gray-900' : 'text-gray-500'
                }`}
                id="listbox-option-0"
                role="option"
                onClick={() => {
                  handleInterestListClick({ id, interest });
                  setExpanded(!expanded);
                }}
              >
                <div className="flex items-center ">
                  <FolderIcon className="w-5 h-5" />

                  <span className="font-normal ml-3 block truncate">{interest}</span>
                </div>
                <span className="absolute inset-y-0 right-0 items-center pr-4 flex">
                  <CheckIcon className={`w-5 h-5 text-indigo-600 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Interests;