
var fzui = {};
if(typeof require === 'function') {
    module.exports = fzui;
}
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
    document.querySelectorAll('.dropdown, .dropup').forEach(item => {
      // Reset all dropdowns on body click
      if (event.type == 'click' && event.target.parentNode === item) return;
      item.classList.remove('active');
      if(typeof onClosedCallback === 'function') onClosedCallback();
    });

    // Replace contents of dropdowns attached directly to the body
    var floatingDropdown = document.querySelectorAll('body > .dropdown-contents');
    if(floatingDropdown.length > 0) {
      floatingDropdown.parentNode.removeChild(floatingDropdown);
      lastContainer.appendChild(floatingDropdown);
      lastContainer.classList.remove('active')
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
    let position = {left: button.left, top: button.top};
    lastContainer = button.parentNode;
    position.top += button.outerHeight();
    contents.remove();
    contents.css({left: position.left, top: position.top, position: 'absolute'});
    parent.addClass('active');
    $('body').append(contents);
    contents.show();
    if(typeof onShowCallback === 'function') onShowCallback(contents)
  }

  function initializeContainer(container) {
    
    container.querySelectorAll('.dropdown > .dropdown-right, .dropup > .dropup-right').forEach(dropdown => {
      let button = dropdown;
      do {
        button = button.previousSibling;
      } while(button.nodeType == Node.TEXT_NODE);
      dropdown.style.left = button.style.left + button.outerWidth - dropdown.outerWidth;
    });
    
    let query = '.dropdown > button, .dropdown > .button, .dropdown > .clickable, .dropup > button, .dropup > .button, .dropup > .clickable';
    container.querySelectorAll(query).forEach(
      dropdown => {
        dropdown.addEventListener('click', event => {
          resetContents(event);
          let button = event.target;
          let content = button.nextSibling
          console.log(content);
          if(content.getAttribute('data-container') == 'body') {
            showContentsOnBody(button, content);
          } else {
            showContentsInPlace(button, content);
          }
          event.stopPropagation();
        })
      }
    );
  }

  this.init = function (containers) {
    containers.forEach(container => initializeContainer(container))
    return callbacks
  }
  document.addEventListener('click', resetContents);
})();

fzui.modals = {};
fzui.uidCounter = 0;

function getModalUID(object) {
  return object.attr('id') || 'modal-uid-' + (fzui.uidCounter ++)
}

function openModal(object) {
  var backdrop = $('<div></div>');
  backdrop.addClass('modal-backdrop');

  var modal = $('<div></div>');
  var close = $('<div></div>');
  var uid = getModalUID(object);
  object.attr('id', uid);
  var content = object.clone();
  var width = object.outerWidth(true);
  var left = $(window).width() / 2 - width / 2;
  var top = 60;

  object.remove();
  content.addClass('modal-wrapper');
  content.prepend(close);
  content.attr('modal-wrapper-' + fzui.modalCount);
  content.css({left: left, top: top});
  close.addClass('close-button').css({left: width - 35});

  backdrop.append(content);
  $('body').append(backdrop);

  backdrop.fadeIn('fast', function () {
    content.css('opacity', '0.0');
    content.show();
    content.trigger('fzui.modal.showing');
    content.animate(
      {top: "+=20", opacity: 1}, 'fast',
      function(){
        fzui.dropdowns.init(content);
        content.trigger('fzui.modal.shown');
      }
    );
  });

  fzui.modals[uid] = {modal: content, content: object, backdrop: backdrop};
  close.on('click.fzui', () => {closeModal(content)});
  return content
}

function closeModal(object) {
  var modalData = fzui.modals[getModalUID(object)];
  var modal = modalData.modal;
  var content = modalData.content;
  var backdrop = modalData.backdrop;
  $(modal).animate({
      top: "-20",
      opacity: 0
    }, 'fast',
    function () {
      $('body').append(content);
      content.addClass('modal');
      backdrop.fadeOut('fast', function () {
        modal.remove();
        backdrop.remove();
      });
    }
  );
}

/**
 * Create a modal window.
 * @params selector A CSS selector used for selecting the contents of the modal
 * @params options An object or string that contains options for the model window creator.
 */
/*$.fn.modal = function (action) {
  if(action === 'close') {
    return closeModal(this)
  } else {
    return openModal(this)
  }
};*/

/**
 * Implements the highlighting of the current tab or pill for tab and pill
 * user interfaces.
 */
fzui.nav = new (function() {
    this.init = function() {
        $('.nav > li > a').click(function(event){
            var parent = $(event.target).parent();
            parent.parent().find('li').removeClass('active')
            parent.addClass('active');
        })
    }
})();


//$(function(){ fzui.dropdowns.init($(document)) })
window.onload = () => fzui.dropdowns.init([document]);
