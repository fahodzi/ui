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
    var width = content.width() == 0 ? 700 : content.width();
    $(selector).remove();
    close.addClass('close-button');
    modal.append(close);
    modal.addClass('modal-wrapper');
    modal.width(width);
    modal.css({left: $(window).width()/2 - width/2 });
    modal.append(content);
    content.removeClass("modal");
    content.addClass('current-modal');

    backdrop.append(modal);
    $('body').append(backdrop);
    $('body').addClass('modal-active');

    backdrop.fadeIn('fast', function(){
        modal.css('opacity', '0.0');
        modal.show();
        modal.animate({
            top:"+=20",
            opacity:1
        }, 'fast');
    })

    close.on('click.fzui', fzui.closeModal);
};

fzui.closeModal = function(){
    $('.modal-wrapper').animate({
            top:"-20",
            opacity: 0
        }, 'fast', 
        function(){
        $('body').append($('.current-modal'));
        $('.current-modal').addClass('modal').removeClass('current-modal');
        $('.modal-backdrop').fadeOut('fast', function(){
            $('.modal-wrapper').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-active');
        });
    });
};
