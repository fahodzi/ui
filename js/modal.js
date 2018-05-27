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