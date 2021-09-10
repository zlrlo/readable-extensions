import { useState } from 'react';
import { FolderOpenIcon, SelectorIcon, FolderIcon, CheckIcon } from '@heroicons/react/outline';

type MenuItems = { id: string; label: string };

type DropdownMenuProps = {
  menuItems: MenuItems[];
};

const DropdownMenu = ({ menuItems }: DropdownMenuProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);
  const [expanded, setExpanded] = useState(false);

  const onMenuClick = () => {
    setExpanded(!expanded);
  };

  const onMenuItemClick = ({ id, label }) => {
    setSelectedMenuItem({ id, label });
  };

  return (
    <div className="mt-1 relative">
      <button
        type="button"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        aria-haspopup="listbox"
        aria-labelledby="listbox-label"
        onClick={onMenuClick}
      >
        <span className="flex items-center">
          <FolderOpenIcon className="w-5 h-5" />
          <span className="ml-3 block truncate">{selectedMenuItem.label}</span>
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
          {menuItems.map(({ id, label }) => {
            const isSelected = selectedMenuItem.id === id ? true : false;

            return (
              <li
                key={id}
                className={`group cursor-default select-none relative py-2 pl-3 pr-9 hover:text-indigo-600 ${
                  isSelected ? 'text-gray-900' : 'text-gray-500'
                }`}
                id="listbox-option-0"
                role="option"
                onClick={() => {
                  onMenuItemClick({ id, label });
                  setExpanded(!expanded);
                }}
              >
                <div className="flex items-center ">
                  <FolderIcon className="w-5 h-5" />

                  <span className="font-normal ml-3 block truncate">{label}</span>
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

export default DropdownMenu;
