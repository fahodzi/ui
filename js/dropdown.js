/**
 * Dropdown menu javascript
 */
fzui.dropdowns = new (function () {
  function resetContents(event) {
    $('.dropdown, .dropup').each(function () {
      // Reset all dropdowns on body click
      if (event.type == 'click' && event.target.parentNode === $(this)[0]) return;
      $(this).removeClass('active');
    });
  }

  function showContentsInPlace(button, content) {
    var parent = button.parent();
    parent.toggleClass('active');
    if (content.hasClass('dropdown-right') || content.hasClass('dropup-right')) {
      content.css({left: button.outerWidth() - content.outerWidth()});
    }
    if (parent.hasClass('dropup')) {
      content.css({top: -content.outerHeight(true)});
    }
  }

  function showContentsOnBody(button, contents) {
    var position = button.offset();
    position.top += button.height();
    contents.remove();
    contents.css({left: position.left, top: position.top, position: 'absolute'});
    $('body').append(contents);
    contents.show();
  }

  function initializeContainer() {
    var container = $(this);
    container.find('.dropdown > .dropdown-right, .dropup > .dropup-right').each(function (i, item) {
      var button = $(item).prev();
      $(item).css({left: button.offset().left + button.outerWidth() - $(item).outerWidth()});
    });
    var query = '.dropdown > button, .dropdown > .button, .dropdown > .clickable,' +
      '.dropup > button, .dropup > .button, .dropup > .clickable';
    container.find(query).click(function (event) {
      resetContents(event);
      var button = $(this);
      var content = button.next();
      if(content.attr('data-container') == 'body') {
        showContentsOnBody(button, content);
      } else {
        showContentsInPlace(button, content);
      }
      event.stopPropagation();
    });
  }

  this.init = function (containers) {
    containers.each(initializeContainer)
  }
  $(document).on('click.fzui', resetContents);
})();
