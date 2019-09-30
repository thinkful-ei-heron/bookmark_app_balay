import $ from 'jquery';
import 'normalize.css';
import './main.css';
import bookmark from './bookmark';
import api from './api';
import store from './store';

function main() {
  bookmark.bindEventListeners();
  bookmark.render();
}

$(main);