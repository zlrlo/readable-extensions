import React, { useState } from 'react';
import { FolderOpenIcon, SelectorIcon, FolderIcon, CheckIcon } from '@heroicons/react/outline';

const CategorySelect = () => {
  const sample = [
    { id: '1', category: 'Life' },
    { id: '2', category: 'Game' },
    { id: '3', category: 'Readable' },
    { id: '4', category: 'Study' },
  ];
  const categoryList = sample;

  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);
  const [expanded, setExpanded] = useState(false);

  const handleCategoryListBoxClick = () => {
    setExpanded(!expanded);
  };

  const handleCategoryListClick = ({ id, category }) => {
    setSelectedCategory({ id, category });
  };

  return (
    <div className="mt-1 relative">
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        aria-haspopup="listbox"
        aria-labelledby="listbox-label"
        onClick={handleCategoryListBoxClick}
      >
        <span className="flex items-center">
          <FolderOpenIcon className="w-5 h-5" />
          <span className="ml-3 block truncate">{selectedCategory.category}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <SelectorIcon className="w-5 h-5" />
        </span>
      </button>
      {expanded && (
        <ul
          className=" absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {categoryList.map(({ id, category }) => {
            const isSelected = selectedCategory.id === id ? true : false;

            return (
              <li
                key={id}
                className={`group cursor-default select-none relative py-2 pl-3 pr-9 hover:text-indigo-600 ${
                  isSelected ? 'text-gray-900' : 'text-gray-500'
                }`}
                id="listbox-option-0"
                role="option"
                onClick={() => {
                  handleCategoryListClick({ id, category });
                }}
              >
                <div className="flex items-center ">
                  <FolderIcon className="w-5 h-5" />

                  <span className="font-normal ml-3 block truncate">{category}</span>
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

export default CategorySelect;
