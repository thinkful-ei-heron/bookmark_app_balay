/* eslint-disable no-console */
const bookmarks = [];
const adding = false;
const error = null;
const filter = 0;


function findById(id) {
  return this.bookmarks.find(item => item.id === id);
}

function addItem(item) {
  item.expanded = false;
  this.bookmarks.push(item);
}

function toggleAdding() {
  this.adding = !this.adding;
}

function toggleExpanded(id) {
  let item = this.findById(id);
  item.expanded = !item.expanded;
}

function deleteBookmark(id) {
  this.bookmarks = this.bookmarks.filter(item => item.id !== id);
}

function filterBookmarks(num) {
  this.filter = num;
}



export default {
  bookmarks,
  adding,
  error,
  filter,
  findById,
  addItem,
  toggleAdding,
  toggleExpanded,
  deleteBookmark,
  filterBookmarks
};

