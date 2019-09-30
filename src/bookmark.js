/* eslint-disable no-console */
import $ from 'jquery';
import api from './api';
import store from './store';



function render() {
  $('.flex-container').html(`<section class="new-and-filter">
  <button type="button" name="new-button" class="new-button" value="New"><i class="fa fa-plus"></i> New</button>
  <button type="button" name="filter-button" class="filter-button" value="Filter"><i class="fa fa-filter"></i> Filter</button> 
</section>`);
}

function generateForm() {
  let form = `<form id="add-bookmark">
    <input type="url" class="bookmark-url" name="bookmark-url" placeholder="Enter URL (required)" required>
    <input type="text" class="bookmark-title" name="bookmark-title" placeholder="Enter title (required)" required>
    <div class="stars">
         <input class="star star-5" id="star-5" type="radio" name="star" value="5"/>
         <label class="star star-5" for="star-5"></label>
         <input class="star star-4" id="star-4" type="radio" name="star" value="4"/>
         <label class="star star-4" for="star-4"></label>
         <input class="star star-3" id="star-3" type="radio" name="star" value="3"/>
         <label class="star star-3" for="star-3"></label>
         <input class="star star-2" id="star-2" type="radio" name="star" value="2"/>
         <label class="star star-2" for="star-2"></label>
         <input class="star star-1" id="star-1" type="radio" name="star" value="1"/>
         <label class="star star-1" for="star-1"></label>
     </div>
    <textarea name="description" form="add-bookmark" class="description">Add description (optional)</textarea>
    <div class="submit-and-cancel">
        <button type="submit" name="submit-bookmark" class="submit-bookmark">Create</button>
        <button type="button" name="cancel-bookmark" class="cancel-bookmark">Cancel</button>
    </div>
</form>`;
  $('.flex-container').on('click', '.new-button', event => {
    $('.flex-container').html(form);
  });
}

function handleBookmarkAdd() {
  //event listener for new bookmark button
  //triggers form view
  //adds new bookmark to server and re-renders the page
  
  $('.flex-container').on('submit', '#add-bookmark', event => {
    event.preventDefault();
    let url = $('.bookmark-url').val();
    let title = $('.bookmark-title').val();
    let rating = $('#add-bookmark input[type=\'radio\']:checked').val();
    let description = $('.description').val();
    
  });
}

function handleFilter() {
  //listens for filter button click
  //creates dropdown of options
  //gathers user input and renders page with relevant bookmarks
}

function handleDelete() {
  //listens for delete button click
  //deletes bookmark from servers and re-renders page
}



function handleTitleClicked() {
  $('li').click(function() {
    if ($(this).find('.hidden').hasClass('expanded')) {
      $(this).find('.hidden').removeClass('expanded');
    } else {
      $(this).find('.hidden').addClass('expanded');
    }
  });
}




function bindEventListeners() {
  generateForm();
  handleBookmarkAdd();
  handleFilter();
  handleDelete();
  handleTitleClicked();
}

export default {
  render,
  bindEventListeners
};