import React, { useEffect, useRef, useState } from 'react';
import Chip from '@extensions/components/ui/Chip';
import { HashtagIcon, BackspaceIcon } from '@heroicons/react/solid';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

const HashTagInput = () => {
  const methods = useFormContext();
  const { register, control } = methods;

  const { fields, append, remove, insert } = useFieldArray({
    name: 'tags',
    control,
  });

  const tagInputRef = useRef(null);

  const handleTagAddButtonClick = e => {
    const inputTagValue = tagInputRef.current.value;

    if (e.key === 'Enter' && inputTagValue) {
      append({ name: inputTagValue });
    }
  };

  useEffect(() => {
    const inputTag = tagInputRef.current;
    inputTag.focus();
    inputTag.value = '';
  }, [fields]);

  return (
    <>
      <div className="flex items-center text-gray-400 focus-within:text-gray-600">
        <HashtagIcon className="flex-none w-5 h-5"></HashtagIcon>
        <input
          ref={tagInputRef}
          className="border-b w-full focus:outline-none p-2"
          placeholder="Focus me"
          onKeyPress={handleTagAddButtonClick}
        />
        <button type="button">+</button>
      </div>

      <ul className="flex flex-wrap mb-4 text-sm font-medium max-h-32 overflow-y-auto">
        {fields.map((field, index) => {
          return (
            <li key={field.id} className="flex mr-2 mb-1">
              <Chip backgroundColor="bg-yellow-200" fontColor="text-black">
                <input {...register(`tags.${index}.name` as 'tags.0.name')} className="w-0" />
                <>#{field['name']}</>
              </Chip>
              <button type="button" className="ml-1" onClick={() => remove(index)}>
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
