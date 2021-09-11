import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Interests = () => {
  const { register, control, setValue } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: 'interests',
    control,
  });

  const [selected, setSelected] = useState({ name: fields[0]['name'] });

  const interestInput = useRef(null);

  const handleInterestAddButtonClick = () => {
    const inputInterest = interestInput.current;
    append({ name: inputInterest.value });
    inputInterest.value = '';
    inputInterest.focus();
  };

  useEffect(() => {
    setValue('interest', selected.name);
  }, [setValue, selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <div className="flex justify-center">
              <input
                ref={interestInput}
                placeholder="Your interests"
                className=" border-b border-indigo-300 w-2/3 py-2 px-4 mr-2 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none"
              />
              <button
                type="button"
                className="flex-shrink-0 bg-indigo-600 text-white text-xs font-semibold py- px-4 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                onClick={() => handleInterestAddButtonClick()}
              >
                Add
              </button>
            </div>

            {fields.map((field, index) => {
              return (
                <Listbox.Option
                  key={field.id}
                  className={({ active }) =>
                    `${active ? 'text-indigo-900 bg-indigo-100' : 'text-gray-900'}
                      cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={{ name: field['name'] }}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`${selected ? 'font-medium' : 'font-normal'} block truncate`}>
                        {field['name']}
                      </span>
                      {selected ? (
                        <span
                          className={`${active ? 'text-indigo-600' : 'text-indigo-600'}
                            absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Interests;
