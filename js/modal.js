fzui.modals = [];

/**
 * Create a modal window.
 * @params selector A CSS selector used for selecting the contents of the modal
 * @params options An object or string that contains options for the model window creator.
 */
$.fn.modal = function () {
  var backdrop = $('<div></div>');
  backdrop.addClass('modal-backdrop');
  backdrop.attr('id', 'modal-backdrop-' + fzui.modals.length);

  var modal = $('<div></div>');

  var close = $('<div></div>');
  var content = this.clone();
  var width = this.outerWidth(true);
  var left = $(window).width() / 2 - width / 2;
  var top = fzui.modals.length * 30 + 60;

  this.remove();
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

  fzui.modals.push({modal: content, content: this, backdrop: backdrop});
  close.on('click.fzui', fzui.closeModal);
  return content;
};

fzui.closeModal = function () {
  var modalData = fzui.modals.pop();
  var modal = modalData.modal;
  var content = modalData.content;
  var backdrop = modalData.backdrop;

  $(modal).animate({
      top: "-20",
      opacity: 0
    }, 'fast',
    function () {
      $('body').append(content);
      content.addClass('modal');//.removeClass('current-modal');
      backdrop.fadeOut('fast', function () {
        modal.remove();
        backdrop.remove();
        fzui.modalCount--;
      });
    }
  );
}
