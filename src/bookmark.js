/* eslint-disable no-console */
import $ from 'jquery';
import api from './api';
import store from './store';

function generateBookmarks(item) {
  let expanded = '';
  let hiddenClass = '';
  if (item.expanded) {
    expanded = `<span class="expanded">
      <button  class="visit-site" onclick="window.open('${item.url}', '_blank')">Visit Site</button>
      <button type="button" class="delete-bookmark"><i class="fa fa-trash"></i> Delete</button>
      <span class="break"></span>
      <p>${item.desc}</p>
      </span>`;
  }

  if (store.filter > item.rating) {
    hiddenClass = 'class="hidden"';
  }

  return `
    <li id="${item.id}" ${hiddenClass}>
    <span class="title-rating">${item.title} </span>
    <span class="rating">${item.rating} <i class="fa fa-star"></i></span>
    <span class="break"></span>
    ${expanded}
    </li>`;
}

function generateForm() {
  return `<form id="add-bookmark" action="#">
      <label for="url" class="form-label">URL</label>
      <input type="url" class="bookmark-url" name="url" placeholder="(required)" required>
      <label for="title" class="form-label">Title</label>
      <input type="text" class="bookmark-title" name="title" placeholder="(required)" required>
      <label for="rating" class="form-label">Rate your bookmark</label>
      <section class="stars" name="rating">
           <input class="star star-5" id="star-5" type="radio" name="rating" value="5"/>
           <label class="star star-5" for="star-5"></label>
           <input class="star star-4" id="star-4" type="radio" name="rating" value="4"/>
           <label class="star star-4" for="star-4"></label>
           <input class="star star-3" id="star-3" type="radio" name="rating" value="3"/>
           <label class="star star-3" for="star-3"></label>
           <input class="star star-2" id="star-2" type="radio" name="rating" value="2"/>
           <label class="star star-2" for="star-2"></label>
           <input class="star star-1" id="star-1" type="radio" name="rating" value="1" checked/>
           <label class="star star-1" for="star-1"></label>
       </section>
       <label for="desc" class="form-label">Add description</label>
      <textarea name="desc" form="add-bookmark" class="description" placeholder="(optional)"></textarea>
      <div class="submit-and-cancel">
          <button type="submit" name="submit-bookmark" class="submit-bookmark">Create</button>
          <button type="button" name="cancel-bookmark" class="cancel-bookmark">Cancel</button>
      </div>
  </form>`;
}

function generateNewAndFilter() {
  return `<button type="button" name="new-button" class="new-button" value="New"><i class="fa fa-plus"></i> New</button>
    <span class="filter-button">
    <label class="select">
    <select>
      <option selected disabled hidden>Filter</option>
      <option value="5">5</option>
      <option value="4">4</option>
      <option value="3">3</option>
      <option value="2">2</option>
      <option value="1">1</option>
    </select>
    </label>
    </span> `;
}


function generateBookmarksString(array) {
  const items = array.map(item => generateBookmarks(item));
  return items.join('');
}


function render() {
  let bookmarks = [...store.bookmarks];
  const bookmarkList = generateBookmarksString(bookmarks);
  $('.bookmark-form').html(generateForm());
  $('.new-and-filter').html(generateNewAndFilter());
  $('.titles').html(bookmarkList);

  if (store.adding) {
    $('.bookmark-form').show();
    $('.new-and-filter').hide();
    $('.titles').hide();
  } else {
    $('.bookmark-form').hide();
    $('.new-and-filter').show();
    $('.titles').show();
  }
  
}

function handleNewButton() {
  $('.flex-container').on('click', '.new-button', event => {
    store.toggleAdding();
    render();
  });
}

function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}


function handleBookmarkAdd() {
  $('.flex-container').on('submit', '#add-bookmark', event => {
    event.preventDefault();
    let formElement = $('#add-bookmark')[0];
    api.createBookmark(serializeJson(formElement))
      .then(res => res.json())
      .then(item => {
        store.addItem(item);
        store.toggleAdding();
        render();
      })
      .catch(err => console.log(err.message));
    
  });
}

function getId(item) {
  return $(item)
    .closest('li')
    .attr('id');
}

function handleFilter() {
  $('.flex-container').on('change', 'select', event => {
    let value = parseInt($('select option:selected').val());
    store.filterBookmarks(value);
    render();
  });

}

function handleTitleClicked() {
  $('.flex-container').on('click', 'li', function() {
    const id = $(this).attr('id');
    store.toggleExpanded(id);
    render();
  });
}

function handleDelete() {
  $('.flex-container').on('click', '.delete-bookmark', event => {
    const id = getId(event.currentTarget);
    api.deleteItem(id)
      .then(() => {
        store.deleteBookmark(id);
        render();
      })
      .catch(err => console.log(err.message));
  });
}


function bindEventListeners() {
  generateForm();
  handleNewButton();
  handleBookmarkAdd();
  handleFilter();
  handleTitleClicked();
  handleDelete();
}

export default {
  render,
  bindEventListeners
};