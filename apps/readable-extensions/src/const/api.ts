export const SERVER_HOST = 'http://localhost:8000';
export const SEARCH_API_BASE =
  'https://search-readable-es-dev-662nasmydk6mmsqnizea4a4eam.ap-northeast-2.es.amazonaws.com';

// export const SERVER_HOST = 'https://readable-2021.herokuapp.com';

export const REST_API_BASE = `${SERVER_HOST}/rest`;

export const REST_API = {
  urlInfo: {
    get: `${REST_API_BASE}/url-info`,
  },
  userBookmark: {
    add: `${REST_API_BASE}/user-bookmark`,
  },
  bookmarks: {
    add: `${REST_API_BASE}/bookmarks/add`,
    getUrlInfo: `${REST_API_BASE}/bookmarks`,
  },
  interests: {
    my: `${REST_API_BASE}/interests/my`,
  },
  search: {
    'tag-suggest': `${REST_API_BASE}/search/tag-suggest`,
  },
};
