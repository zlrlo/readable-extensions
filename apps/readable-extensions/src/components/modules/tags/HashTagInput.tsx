import React, { useEffect, useRef, useState } from 'react';
import Chip from '@extensions/components/ui/Chip';
import { HashtagIcon, BackspaceIcon } from '@heroicons/react/solid';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { REST_API } from '@extensions/const/api';
import { useAuthState } from '@extensions/store/AuthProvider';

const HashTagInput = () => {
  const { auth } = useAuthState();

  const methods = useFormContext();
  const { register, control } = methods;

  const { fields, append, remove, insert } = useFieldArray({
    name: 'tags',
    control,
  });

  const tagInputRef = useRef(null);

  const handleChange = async e => {
    const inputTagValue = tagInputRef.current.value;

    const rawResponse = await fetch(REST_API.search['tag-suggest'], {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify({ query: inputTagValue }),
    });
    const response = await rawResponse.json();

    if (response && response.length > 0) {
      for (const tag of response) {
        append({ name: tag.tag });
      }
    }
  };

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
          onChange={handleChange}
        />
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
