/* eslint-disable no-console */
const BASE_URL = 'https://thinkful-list-api.herokuapp.com/balayb';

function createBookmark(url, title, description, rating) {
  const data = {
    title: title,
    url: url,
    desc: description,
    rating: rating
  };
  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  });
}

function getItems() {
  return fetch(`${BASE_URL}/bookmarks`);
}


export default {
  createBookmark,
  getItems

};