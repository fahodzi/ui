/**
 * Dropdown menu javascript
 */
fzui.dropdowns = new (function () {

  let lastContainer;
  let onClosedCallback;
  let onShowCallback;
  let callbacks = {
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
    let floatingDropdown = document.querySelector('body > .dropdown-contents');
    if(floatingDropdown) {
      floatingDropdown.parentNode.removeChild(floatingDropdown);
      lastContainer.appendChild(floatingDropdown);
      lastContainer.classList.remove('active')
    }
  }

  function showContentsInPlace(button, content) {
    var parent = button.parentNode;
    fzui.domUtils.toggleClass(parent, 'active');
    if (content.classList.contains('dropdown-right') || content.classList.contains('dropup-right')) {
      content.style.left = (button.offsetWidth - content.offsetWidth) + 'px';
    }
    if (parent.classList.contains('dropup')) {
      content.style.top = - fzui.domUtils.outerHeight(content, true) + "px";
    }
    if(typeof onShowCallback === 'function') onShowCallback(content)
  }

  function showContentsOnBody(button, contents) {
    let position = button.getBoundingClientRect();
    lastContainer = button.parentNode;
    contents.parentNode.removeChild(contents);
    contents.style.position = 'absolute';
    contents.style.left = position.left + 'px'; 
    contents.style.top = (position.top + window.scrollY + fzui.domUtils.outerHeight(button, true)) + 'px'; 
    document.getElementsByTagName('body')[0].appendChild(contents);
    contents.style.display = 'block';
    if(typeof onShowCallback === 'function') onShowCallback(contents)
  }

  /**
   * Initialize all the dropdowns in a containing element.
   * Use this when new dropdowns are defined after the page has already been loaded.
   * 
   * @param {Node} container 
   */
  function initializeContainer(container) {

    container.querySelectorAll('.dropdown > .dropdown-right, .dropup > .dropup-right').forEach(dropdown => {
      let button = fzui.domUtils.previousSibling(dropdown);
      dropdown.style.left = button.style.left + button.outerWidth - dropdown.outerWidth;
    });
    
    let query = '.dropdown > button, .dropdown > .button, .dropdown > .clickable, .dropup > button, .dropup > .button, .dropup > .clickable';
    container.querySelectorAll(query).forEach(
      dropdown => {
        dropdown.addEventListener('click', event => {
          resetContents(event);
          let button = event.currentTarget;
          let content = fzui.domUtils.nextSibling(button);

          if(content.getAttribute('data-container') == 'body') {
            showContentsOnBody(button, content);
          } else {
            showContentsInPlace(button, content);
          }

          event.stopPropagation();
        }, true)
      }
    );
  }

  this.init = function (containers) {
    if(typeof containers[Symbol.iterator] !== 'function') {
      containers = [containers];
    }
    containers.forEach(container => initializeContainer(container))
    return callbacks
  }
  document.addEventListener('click', resetContents);
})();
