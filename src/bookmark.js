/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import $ from 'jquery';
import api from './api';
import store from './store';



function generateBookmarks(item) {
  let expanded = '';
  let hiddenClass = '';
  if (item.expanded) {
    expanded = `<span class="expanded" role="bookmark-info">
      <button type="button" class="visit-site" onclick="window.open('${item.url}', '_blank')">Visit Site</button>
      <button type="button" class="delete-bookmark"><i class="fa fa-trash"></i> Delete</button>
      <span class="break"></span>
      <p>${item.desc}</p>
      </span>`;
  }

  if (store.filter > item.rating) {
    hiddenClass = 'class="hidden"';
  }

  return `
    <li id="${item.id}" ${hiddenClass} tabindex="0" role="button" name="bookmark" aria-expanded="false">
    <span class="title-rating" name="bookmark-title">${item.title} </span>
    <span class="rating" name="bookmark-rating">${item.rating} <i class="fa fa-star"></i></span>
    <span class="break"></span>
    ${expanded}
    </li>`;
}

function generateForm() {
  return `<form id="add-bookmark" role="add-bookmark" action="#">
      <label for="url" class="form-label">URL</label>
      <input type="url" class="bookmark-url"  id="url" name="url" placeholder="(required)" required>
      <label for="title" id="title" class="form-label">Title</label>
      <input type="text" class="bookmark-title" name="title" placeholder="(required)" required>
      <label for="bookmark-rating" class="form-label">Rate your bookmark</label>
      <fieldset class="stars" id="bookmark-rating">
          <div>
           <input class="star star-1" id="star-1" type="radio" name="rating" value="1" checked/>
           <label class="star star-1" for="star-1"><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></label>
           </div>
           <div>
           <input class="star star-2" id="star-2" type="radio" name="rating" value="2"/>
           <label class="star star-2" for="star-2"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></label>
           </div>
           <div>
           <input class="star star-3" id="star-3" type="radio" name="rating" value="3"/>
           <label class="star star-3" for="star-3"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i><i class="fa fa-star-o"></i></label>
           </div>
           <div>
           <input class="star star-4" id="star-4" type="radio" name="rating" value="4"/>
           <label class="star star-4" for="star-4"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star-o"></i></label>
           </div>
           <div>
           <input class="star star-5" id="star-5" type="radio" name="rating" value="5"/>
           <label class="star star-5" for="star-5"><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></label> 
           </div>
       </fieldset>
       <label for="bookmark-description" class="form-label">Add description</label>
      <textarea name="desc" form="add-bookmark" id="bookmark-description" class="description" placeholder="(optional)"></textarea>
      <div class="submit-and-cancel">
          <button type="submit" name="submit-bookmark" class="submit-bookmark">Create</button>
          <button type="button" name="cancel-bookmark" class="cancel-bookmark">Cancel</button>
      </div>
  </form>`;
}

function generateNewAndFilter() {
  return `<button type="button" name="new-button" class="new-button" value="New"><i class="fa fa-plus"></i> New</button>
    <select role="filter-bookmarks" class="filter">
      <option id="text" selected disabled hidden>Filter by</option>
      <option value="5">5 stars</option>
      <option value="4">4 stars & up</option>
      <option value="3">3 stars & up</option>
      <option value="2">2 stars & up</option>
      <option value="1">1 star & up</option>
    </select>`;
}

function generateError(message) {
  return `<section class="error-content" role="alert">
  <p>${message}</p>
  <button type="button" role="close-error" id="cancel-error"><i class="fa fa-times"></i></button>
</section>`;
}

function renderError() {
  if (store.error) {
    const el = generateError(store.error);
    $('.error-container').html(el);
  } else {
    $('.error-container').empty();
  }
}

function handleCloseError() {
  $('.error-container').on('click', '#cancel-error', () => {
    store.setError(null);
    renderError();
  });
}


function generateBookmarksString(array) {
  const items = array.map(item => generateBookmarks(item));
  return items.join('');
}


function render() {
  renderError();
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

function handleCancel() {
  $('.flex-container').on('click', '.cancel-bookmark', event => {
    $('.bookmark-url, .bookmark-title, .stars, .description').val('');
    store.toggleAdding();
    render();
  });
}


function handleBookmarkAdd() {
  $('.flex-container').on('submit', '#add-bookmark', event => {
    event.preventDefault();
    let formElement = $('#add-bookmark')[0];
    api.createBookmark(serializeJson(formElement))
      .then(item => {
        store.addItem(item);
        store.toggleAdding();
        render();
      })
      .catch((err) => {
        store.setError(err.message);
        renderError();
      });
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
  $('.flex-container').on('keypress', 'li', function(event) {
    if (event.target.matches('button')) {
      return;
    }
    if (event.keyCode !== 13 && event.keyCode !== 32) {
      return;
    }
    const id = $(this).attr('id');
    store.toggleExpanded(id);
    render();
  });
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
      .catch((err) => {
        store.setError(err.message);
        renderError();
      });
  });
}


function bindEventListeners() {
  generateForm();
  handleNewButton();
  handleCancel();
  handleBookmarkAdd();
  handleFilter();
  handleTitleClicked();
  handleDelete();
  handleCloseError();
}

export default {
  render,
  bindEventListeners
};