/* eslint-disable no-console */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/balayb';

function createBookmark(formElement) {
  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: formElement
  });
}

function getItems() {
  return fetch(`${BASE_URL}/bookmarks`);
}

function deleteItem(id) {
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
}


export default {
  createBookmark,
  getItems,
  deleteItem
};