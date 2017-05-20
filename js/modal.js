fzui.modalSelector = null;

/**
 * Create a modal window.
 * @params selector A CSS selector used for selecting the contents of the modal
 * @params options An object or string that contains options for the model window creator.
 */
fzui.modal = function(selector, options){
    if($('body').hasClass('modal-active')) return;
    var backdrop = $('<div></div>');
    backdrop.addClass('modal-backdrop');
    
    var modal = $('<div></div>');

    var close = $('<button></button>');
    var content = $(selector).clone(); 
    $(selector).remove();
    close.addClass('close-button');
    modal.append(close);
    modal.addClass('modal-wrapper');
    modal.append(content);
    content.removeClass("modal");
    content.addClass('current-modal');

    backdrop.append(modal);
    $('body').append(backdrop);
    $('body').addClass('modal-active');

    backdrop.fadeIn('fast', function(){
            modal.fadeIn('fast', function(){
        });
    })

    close.on('click.fzui', fzui.closeModal);
};

fzui.closeModal = function(){
    $('.modal-wrapper').fadeOut('fast', function(){
        //$(fzui.modalSelector).html($('.modal-wrapper').html());
        $('body').append($('.current-modal'));
        $('.current-modal').removeClass('.current-modal');
        $('.modal-backdrop').fadeOut('fast', function(){
            $('.modal-wrapper').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-active');
        });
    });
};
