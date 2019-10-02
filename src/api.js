/* eslint-disable no-console */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/balayb';

function listApiFetch(...args) {
  let error;
  return fetch(...args)
    .then(res => {
      if (!res.ok) {
        error = { code: res.status};
        if (!res.headers.get('content-type').includes('json')) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }
      return res.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
}

function createBookmark(formElement) {
  return listApiFetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: formElement
  });
}

function getItems() {
  return listApiFetch(`${BASE_URL}/bookmarks`);
}

function deleteItem(id) {
  return listApiFetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}


export default {
  createBookmark,
  getItems,
  deleteItem
};