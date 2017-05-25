fzui.modals = [];

/**
 * Create a modal window.
 * @params selector A CSS selector used for selecting the contents of the modal
 * @params options An object or string that contains options for the model window creator.
 */
fzui.modal = function(selector, options){
    var backdrop = $('<div></div>');
    backdrop.addClass('modal-backdrop');
    backdrop.attr('id', 'modal-backdrop-' + fzui.modals.length);
    
    var modal = $('<div></div>');

    var close = $('<button></button>');
    var content = $(selector).clone(); 
    var width = $(selector).outerWidth(true);

    $(selector).remove();
    close.addClass('close-button');
    modal.append(close);
    modal.addClass('modal-wrapper');
    modal.attr('modal-wrapper-' + fzui.modalCount);
    modal.width(width);
    modal.css({left: $(window).width()/2 - width/2 , top: fzui.modals.length * 30});
    modal.append(content);
    content.removeClass("modal");
    //content.addClass('current-modal');

    backdrop.append(modal);
    $('body').append(backdrop);

    backdrop.fadeIn('fast', function(){
        modal.css('opacity', '0.0');
        modal.show();
        modal.animate({
            top:"+=20",
            opacity:1
        }, 'fast');
    });

    fzui.modals.push({modal:modal, content:content, backdrop:backdrop});

    close.on('click.fzui', fzui.closeModal);
};

fzui.closeModal = function() {
    var modalData = fzui.modals.pop();
    var modal = modalData.modal;
    var content = modalData.content;
    var backdrop = modalData.backdrop;

    $(modal).animate({
            top:"-20",
            opacity: 0
        }, 'fast', 
        function(){
            $('body').append(content);
            content.addClass('modal');//.removeClass('current-modal');
            backdrop.fadeOut('fast', function(){
                modal.remove();
                backdrop.remove();
                fzui.modalCount--;
            });
        }
    );
}
