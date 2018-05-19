fzui.modals = new(function(){
  let uidCounter = 0;
  let modalCount = 0;
  let dom = new DomUtils();

  function getModalUID(object) {
    return object.getAttribute('id') || 'modal-uid-' + (fzui.uidCounter ++)
  }

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
  
    let modal = document.createElement('div');
    let close = document.createElement('div');
    let uid = getModalUID(object);
    let content = object.cloneNode(true);
    let top = 60;
    let width = dom.outerWidth(content, true);
    let left = (window.innerWidth / 2) - (width / 2);
  
    object.setAttribute('id', uid);
    object.parentNode.removeChild(object);
    content.classList.add('modal-wrapper');
    content.insertBefore(close, content.firstChild);
    content.style.left = left + 'px';
    content.style.top = top + 'px'; 
    close.classList.add('close-button');
    close.style.left = (width - 35) + 'px';
  
    backdrop.appendChild(content);
    document.body.appendChild(backdrop);
    backdrop.style.display = 'block';
    content.style.display = 'block';
  
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
  
    fzui.modals[uid] = {modal: content, content: object, backdrop: backdrop};
    close.addEventListener('click', () => this.close(content));
    return content
  }
  
  this.close = function (object) {
    let modalData = fzui.modals[getModalUID(object)];
    let modal = modalData.modal;
    let content = modalData.content;
    let backdrop = modalData.backdrop;

    document.body.appendChild(content);
    content.classList.add('modal');
    backdrop.parentNode.removeChild(backdrop);
    modal.parentNode.removeChild(modal);

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