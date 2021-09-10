import React, { useState } from 'react';
import Chip from '@extensions/components/ui/Chip';
import { HashtagIcon, BackspaceIcon } from '@heroicons/react/solid';
import { useFieldArray } from 'react-hook-form';

type HashTagInputProps = {
  inputControl: any;
  inputRegister: any;
};

const HashTagInput = ({ inputControl, inputRegister }: HashTagInputProps) => {
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control: inputControl,
  });

  const [inputText, setInputText] = useState('');

  const handleInputChange = e => {
    setInputText(e.target.value);
  };

  const handleTagAddButtonClick = () => {
    append({ name: inputText });
    setInputText('');
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
        />
        <button onClick={() => handleTagAddButtonClick()}>+</button>
      </div>

      <ul className="flex flex-wrap mb-4 text-sm font-medium max-h-32 overflow-y-auto">
        {fields.map((field, index) => {
          return (
            <li key={field.id} className="flex mr-2 mb-1">
              <Chip backgroundColor="bg-yellow-200" fontColor="text-black">
                <input key={field.id} {...inputRegister(`tags.${index}.name` as const)} className="w-0" />
                <>#{field['name']}</>
              </Chip>
              <button className="ml-1" onClick={() => remove(index)}>
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
