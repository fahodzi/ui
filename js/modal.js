var fzui = new (function()
{
    var closeModal = function(){
        $('.modal-wrapper').fadeOut('fast', function(){
            $('.modal-backdrop').fadeOut('fast');
        });
    };
    this.closeModal = closeModal;

    this.modal = function(selector, options){
        // Prevent modals from 
        if($('body').hasClass('modal-active')) return;

        var backdrop = $('<div></div>');
        backdrop.addClass('modal-backdrop');
        
        var modal = $('<div></div>');
        var title = $('<div><span>Hello</span></div>');
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

        close.on('click.fzui', closeModal);
    }
})();
