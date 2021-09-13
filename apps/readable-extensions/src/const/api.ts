export const SERVER_HOST = 'http://localhost:8000';
// export const SERVER_HOST = 'https://readable-2021.herokuapp.com';

export const API_REST_BASE = `${SERVER_HOST}/rest`;
// export const URL_SAVE_BOOKMARK = `${API_REST_BASE}/bookmarks/add`;
// export const GET_URL_INFO = `${API_REST_BASE}/bookmarks`;

export const REST_API = {
  urlInfo: {
    get: `${API_REST_BASE}/url-info`,
  },
  bookmarks: {
    add: `${API_REST_BASE}/bookmarks/add`,
    getUrlInfo: `${API_REST_BASE}/bookmarks`,
  },
  interests: {
    my: `${API_REST_BASE}/interests/my`,
  },
};
