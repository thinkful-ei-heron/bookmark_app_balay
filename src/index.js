import $ from 'jquery';
import 'normalize.css';
import './main.css';
import bookmark from './bookmark';
import api from './api';
import store from './store';

function main() {
  api.getItems()
    .then(res => res.json())
    .then(items => {
      items.forEach(item => store.addItem(item));
      bookmark.render();
    });
  bookmark.bindEventListeners();
  bookmark.render();
}

$(main);