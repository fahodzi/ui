
var fzui = {};

window.addEventListener('load', () => fzui.dropdowns.init([document]));

if(typeof require === 'function') {
  module.exports = fzui;
}
fzui.domUtils = new (function () {

  function getSubsequent(node, direction) {
    do {
      node = node[`${direction}Sibling`];
    } while (node !== null && node.nodeType == Node.TEXT_NODE);
    return node;
  }

  /**
   * Get the dimensions of a given dom node.
   * 
   * @param {DomNode} node 
   * @param {string} dimension 
   * @param {boolean} margins 
   * @param {string} margin1 
   * @param {string} margin2 
   */
  function getDimension(node, dimension, margins, margin1, margin2) {
    let style = window.getComputedStyle(node);
    if (style['display'] == 'none' || style['display'] == '') {
      let parent = node.parentNode;
      let sibling = node.nextSibling;
      let position = node.style.position;
      document.body.appendChild(node);
      node.style.display = 'block';
      node.style.position = 'absolute';
      let measured = getDimension(node, dimension, margins, margin1, margin2);
      node.style.display = 'none';
      node.style.position = position;
      if (parent) {
        parent.insertBefore(node, sibling);
      }
      return measured;
    }
    return parseInt(style[dimension])
      + parseInt(style[`padding-${margin1}`]) + parseInt(style[`padding-${margin2}`])
      + (margins ? parseInt(style[`margin-${margin1}`]) + parseInt(style[`margin-${margin2}`]) : 0);
  }

  this.nextSibling = function (node) {
    return getSubsequent(node, 'next')
  }

  this.previousSibling = function (node) {
    return getSubsequent(node, 'previous')
  }

  this.toggleClass = function (node, className) {
    if (node.classList.contains(className)) {
      node.classList.remove(className)
    } else {
      node.classList.add(className)
    }
  }

  this.toggleStyleProperty = function(node, styleName, value1, value2) {
    if (node.style[styleName] === value1) {
      node.style[styleName] = value2
    } else {
      node.style[styleName] = value1
    }
  }

  this.outerHeight = function (node, margins) {
    return getDimension(node, 'height', margins, 'top', 'bottom')
  }

  this.outerWidth = function (node, margins) {
    return getDimension(node, 'width', margins, 'left', 'right')
  }

  this.siblings = function(node) {
    let siblings = [];
    for(let sibling = node.parentNode.firstChild ;sibling; sibling = sibling.nextSibling) {
      if(sibling === node || sibling.nodeType === Node.TEXT_NODE) {
        continue;
      }
      siblings.push(sibling);
    }
    return siblings;
  }

})();


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

fzui.modals = new(function(){
  let modalCount = 0;
  let openModals = new Map();

  function getObject(description) {
    if(typeof description === 'string') {
      return document.querySelector(description);
    }
    return description
  }
  
  this.open = function (description) {
    let object = getObject(description);
    let backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
  
    let close = document.createElement('div');
    let modal = object.cloneNode(true);
    let top = 60;
    let width = fzui.domUtils.outerWidth(modal, true);
    let left = (window.innerWidth / 2) - (width / 2);

    let shownEvent = new CustomEvent('shown', {detail: {modal:modal}});
  
    object.parentNode.removeChild(object);
    modal.classList.add('modal-wrapper');
    modal.insertBefore(close, modal.firstChild);
    modal.style.left = left + 'px';
    modal.style.top = top + 'px'; 
    close.classList.add('close-button');
    close.style.left = (width - 35) + 'px';
  
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    backdrop.style.display = 'block';
    modal.style.display = 'block';
    object.dispatchEvent(shownEvent);
  
    /*backdrop.fadeIn('fast', function () {
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
    });*/
  
    close.addEventListener('click', () => this.close(modal));
    openModals.set(modal, {content: object, backdrop: backdrop});
    return modal
  }
  
  this.close = function (modal) {
    let modalData = openModals.get(getObject(modal));
    let content = modalData.content;
    let backdrop = modalData.backdrop;

    backdrop.parentNode.removeChild(backdrop);
    openModals.delete(modal);
    document.body.appendChild(content);
    content.classList.add('modal');

    /*$(modal).animate({
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
    );*/
  }  
})();
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

