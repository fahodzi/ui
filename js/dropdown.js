/**
 * Dropdown menu javascript
 */
fzui.dropdowns = new (function () {

  var lastContainer;
  var onClosedCallback;
  var onShowCallback;
  var callbacks = {
    onClose : function (callback) {
      onClosedCallback = callback;
      return callbacks
    },
    onShow : function (callback) {
      onShowCallback = callback;
      return callbacks
    }
  };


  function resetContents(event) {
    $('.dropdown.active, .dropup.active').each(function () {
      // Reset all dropdowns on body click
      if (event.type == 'click' && event.target.parentNode === $(this)[0]) return;
      $(this).removeClass('active');
      if(typeof onClosedCallback === 'function') onClosedCallback();
    });
    var floatingDropdown = $('body > .dropdown-contents');
    if(floatingDropdown.length > 0) {
      floatingDropdown.hide();
      floatingDropdown.remove();
      lastContainer.append(floatingDropdown);
      lastContainer.removeClass('active');
    }
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
    if(typeof onShowCallback === 'function') onShowCallback(content)
  }

  function showContentsOnBody(button, contents) {
    var position = button.offset();
    var parent = button.parent();
    lastContainer = button.parent();
    position.top += button.outerHeight();
    contents.remove();
    contents.css({left: position.left, top: position.top, position: 'absolute'});
    parent.addClass('active');
    $('body').append(contents);
    contents.show();
    if(typeof onShowCallback === 'function') onShowCallback(contents)
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
    containers.each(initializeContainer);
    return callbacks
  }
  $(document).on('click.fzui', resetContents);
})();
