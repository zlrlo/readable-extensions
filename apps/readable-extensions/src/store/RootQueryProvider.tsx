import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from './AuthProvider';
import { REST_API } from '@extensions/const/api';
import useFetch from '@extensions/hooks/useFetch';

type AuthProviderProps = {
  children: React.ReactNode;
};

type UrlData = {
  url: string;
  siteName: string;
  type: string;
  title: string;
  imageUrl: string;
  howMany: number;
};

type UserData = {
  interests?: { id: string; name: string }[];
  selectedInterest?: string;
  tags?: { id: string; name: string }[];
};

type FormData = {
  interest: string;
  tags: { name: string }[];
};

type RecommendationUrlData = Omit<UrlData, 'howMany'>;
type RecommendationUserBookmarkData = {
  id: string;
  urlHash: string;
  urlInfo: RecommendationUrlData;
};

export type RecommendationData = {
  tag: string;
  recommendedUserBookmarks: RecommendationUserBookmarkData[];
};

type RootQueryType = {
  currentUrlData: UrlData;
  isServerDataLoading: boolean;
  userData: UserData;
  recommendationsData: RecommendationData[];
  submitData: (data: FormData) => void;
};

const RootQueryContext = React.createContext<RootQueryType>(null);

export const RootQueryProvider = ({ children }: AuthProviderProps) => {
  const [url, setUrl] = useState<string>();
  const [formData, setFormData] = useState<FormData>();
  const [recommendationsData, setRecommendationsData] = useState<RecommendationData[]>([]);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const url = tabs[0].url;
      if (!url) return;
      setUrl(url);
    });
  }, []);

  const { isLoading: isServerDataLoading, responseData: serverData } = useFetch({
    variables: { api: REST_API.urlInfo.get, data: { url } },
    skip: !url,
  });

  let currentUrlData: UrlData;
  let userData: UserData;

  if (serverData) {
    const { urlInfo, userBookmark, interests, latestInterest } = serverData;
    currentUrlData = {
      siteName: urlInfo?.siteName ?? '',
      title: urlInfo?.title ?? '',
      type: urlInfo?.type ?? '',
      imageUrl: urlInfo?.imageUrl ?? '',
      url: urlInfo.url ?? '',
      howMany: urlInfo.howMany ?? 0,
    };

    const tagData = userBookmark?.tags.map(({ id, tag }) => {
      return { id, name: tag };
    });

    const interestData = interests?.map(({ id, interest }) => {
      return { id, name: interest };
    });

    userData = {
      interests: interestData ?? [],
      selectedInterest: userBookmark?.interest.interest,
      tags: tagData ?? [],
    };
  }

  const readySubmit = formData && currentUrlData;

  const { isLoading: isSubmitting, responseData: submittedData } = useFetch({
    variables: {
      api: REST_API.userBookmark.add,
      data: {
        url: currentUrlData?.url,
        interest: formData?.interest,
        tags: formData?.tags.map(({ name }) => name),
      },
    },
    skip: !readySubmit,
  });

  useEffect(() => {
    if (submittedData) {
      const { recommendations = [], userBookmark } = submittedData;
      if (recommendations.length === 0) {
        alert('It has been successfully saved');
        window.close();
      }
      setRecommendationsData(recommendations);
    }
  }, [submittedData]);

  const submitData = (data: FormData) => {
    setFormData(data);
  };

  return (
    <RootQueryContext.Provider
      value={{ currentUrlData, isServerDataLoading, userData, submitData, recommendationsData }}
    >
      {children}
    </RootQueryContext.Provider>
  );
};

export const useCurrentSiteInfoState = () => {
  return useContext(RootQueryContext);
};
