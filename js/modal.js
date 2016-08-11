fzui.modal = function(selector, options){
    // Prevent modals from
    var title = ''; 
    if($('body').hasClass('modal-active')) return;
    if(typeof options == 'string') {
        title = options;
    }

    var backdrop = $('<div></div>');
    backdrop.addClass('modal-backdrop');
    
    var modal = $('<div></div>');
    var title = $('<div><span>' + title + '</span></div>');
    var close = $('<button></button>');

    title.addClass('title');
    close.addClass('close-button');

    title.append(close);
    modal.append(title);
    modal.addClass('modal-wrapper');
    modal.append($(selector).html());

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
        $('.modal-backdrop').fadeOut('fast', function(){
            $('.modal-wrapper').remove();
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-active');
        });
    });
};
