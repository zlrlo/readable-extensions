import config from '@extensions/const/website-config';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Interests from '../Interests/Interests';
import HashTagInput from '../tags/HashTagInput';

type FormProps = {
  userData: {
    interests?: { id: string; name: string }[];
    selectedInterest?: string;
    tags?: { id: string; name: string }[];
  };
  submitData: (data: { interest: string; tags: { name: string }[] }) => void;
};

type FormValues = {
  tags: {
    name: string;
  }[];

  interests: {
    name: string;
  }[];

  selectedInterest: string;
};

const Form = ({ userData, submitData }: FormProps) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      tags: userData.tags ?? [],
      interests: userData.interests ?? [{ name: 'Readable' }],
      selectedInterest: userData.selectedInterest ?? 'Readable',
    },
  });

  const { getValues } = methods;

  const onSubmit = () => {
    const { tags, selectedInterest } = getValues();
    submitData({ tags, interest: selectedInterest });
  };

  return (
    <FormProvider {...methods}>
      <div className="col-start-1 row-start-3 space-y-3 px-4 pb-4">
        <Interests />
        <HashTagInput />
        <div className="flex items-end">
          <a href={config.siteUrl} target="_blank" className="text-gray-400 hover:text-blue-600" rel="noreferrer">
            Go to the Readable
          </a>
          <input
            type="button"
            onClick={() => onSubmit()}
            className="bg-indigo-100 text-indigo-700 text-base font-semibold px-6 py-2 rounded-lg ml-auto disabled:opacity-50"
            value="Readable it"
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default Form;
