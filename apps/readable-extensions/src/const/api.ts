const SERVER_HOST = process.env.NX_SERVER_HOST;

export const API_REST_BASE = `${SERVER_HOST}/rest`;

export const URL_SAVE_BOOKMARK = `${API_REST_BASE}/bookmarks/add`;
