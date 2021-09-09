import React, { useEffect, useState } from 'react';
import { REST_API } from '@extensions/src/const/api';
import useFetch, { UseFetchMethod } from '../common/useFetch';
import DropdownMenu from '../../ui/dropdown-menu';

const Interests = () => {
  const { data } = useFetch({
    url: REST_API.interests.my,
    method: UseFetchMethod.GET,
  });

  const defaultInterest = [{ id: '0', interest: 'Readable' }];
  const interests = data?.length ? [...defaultInterest, ...data] : defaultInterest;

  return <DropdownMenu menuItems={interests.map(({ id, interest }) => ({ id: id, label: interest }))} />;
};

export default Interests;
