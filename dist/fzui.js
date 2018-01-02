(function($){
var fzui = {};

/**
 * Dropdown menu javascript
 */
fzui.dropdowns = new (function () {
    function resetContents (event) {
        $('.dropdown, .dropup').each(function(){
            // Reset all dropdowns on body click
            if(event.type == 'click' && event.target.parentNode === $(this)[0]) return;
            $(this).removeClass('active');
        });
    }

    this.init = function(container){
        container.find('.dropdown > .dropdown-right, .dropup > .dropup-right').each(function(i, item){
            var button = $(item).prev();
            $(item).css({left: button.offset().left + button.outerWidth() - $(item).outerWidth()});
        });
        var query = '.dropdown > button, .dropdown > .button, .dropdown > .clickable,' +
                    '.dropup > button, .dropup > .button, .dropup > .clickable';
        container.find(query).click(function(event) {
            resetContents(event);
            var button = $(this);
            var parent = button.parent();
            var content = button.next();
            parent.toggleClass('active');
            if(content.hasClass('dropdown-right') || content.hasClass('dropup-right')) {
                content.css({left: button.outerWidth() - content.outerWidth()});
            }
            if(parent.hasClass('dropup')) {
                content.css({top: -content.outerHeight(true)});
            }
            event.stopPropagation();
        });
    }
    $(document).on('click.fzui', resetContents);
})();

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


$(function(){ fzui.dropdowns.init($(document)) })
}(jQuery));