/**
 * Dropdown menu javascript
 */
fzui.dropdowns = new (function () {

  var lastContainer;

  function resetContents(event) {
    document.querySelectorAll('.dropdown, .dropup').forEach(item => {
      // Reset all dropdowns on body click
      if (event.type == 'click' && event.target.parentNode === item) return;
      item.classList.remove('active');
    });

    // Replace contents of dropdowns attached directly to the body
    var floatingDropdown = document.querySelectorAll('body > .dropdown-contents');
    if(floatingDropdown.length > 0) {
      floatingDropdown.parentNode.removeChild(floatingDropdown);
      lastContainer.appendChild(floatingDropdown);
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
  }

  function showContentsOnBody(button, contents) {
    let position = {left: button.left, top: button.top};
    lastContainer = button.parentNode;
    position.top += button.outerHeight();
    contents.remove();
    contents.css({left: position.left, top: position.top, position: 'absolute'});
    $('body').append(contents);
    contents.show();
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
  }
  document.addEventListener('click', resetContents);
})();
