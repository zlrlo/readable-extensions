import { RecommendationData } from '@extensions/store/RootQueryProvider';
import React from 'react';

type Props = {
  recommendationsData: RecommendationData[];
};

const Recommendations = ({ recommendationsData }: Props) => {
  console.log('TCL: Recommendations -> recommendationsData', recommendationsData);

  return (
    <div className="grid grid-cols-1 w-80">
      <div className="grid grid-cols-1 w-80">
        {recommendationsData?.length > 0 &&
          recommendationsData.map((recommendation, index) => {
            return (
              <ul className="flex flex-wrap mb-4 text-sm font-medium max-h-32 overflow-y-auto">
                <h2>{recommendation.tag}</h2>
                {recommendation.recommendedUserBookmarks.map((bookmark, index) => {
                  return (
                    <>
                      <li>
                        <a
                          href={`${bookmark.urlInfo.url}`}
                          target="_blank"
                          className="text-gray-400 hover:text-blue-600"
                          rel="noreferrer"
                        >
                          {bookmark.urlInfo.title}
                        </a>
                      </li>
                      <br />
                    </>
                  );
                })}
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default Recommendations;
