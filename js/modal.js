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
$.fn.modal = function (action) {
  if(action === 'close') {
    return closeModal(this)
  } else {
    return openModal(this)
  }
};
