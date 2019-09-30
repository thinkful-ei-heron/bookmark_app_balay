function handleTitleClicked() {
  $('li').click(function() {
    if ($(this).find('.hidden').hasClass('expanded')) {
      $(this).find('.hidden').removeClass('expanded');
    } else {
      $(this).find('.hidden').addClass('expanded');
    }
  });
}




function doIt() {
  handleTitleClicked();
}
$(doIt);