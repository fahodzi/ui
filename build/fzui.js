var fzui = {};
;/**
 * Dropdown menu javascript
 */
function dropdown() {
    var resetContents = function (event) {
        $('.dropdown').each(function(){
            // Reset all dropdowns on body click
            if(event.type == 'click' && event.target.parentNode === $(this)[0]) return;
            $(this).removeClass('active');
        });
    }

    this.init = function(){
        $('.dropdown > button').click(function(event){
            resetContents(event);
            var parent;
            parent = $(this).parent();
            parent.toggleClass('active');
            event.stopPropagation();
        });
    }

    $(document).on('click.fzui', resetContents);
}

fzui.dropdowns = new dropdown();

$(function() {
    fzui.dropdowns.init();
})
;fzui.modalSelector = null;

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
    modal.width(content.width() == 0 ? 700 : content.width());
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
;/**
 * Implements the highlighting of the current tab or pill for tab and pill
 * user interfaces.
 */
function nav() {
    this.init = function() {
        $('.nav > li > a').click(function(event){
            var parent = $(event.target).parent();
            parent.parent().find('li').removeClass('active')
            parent.addClass('active');
        })
    }
}

fzui.nav = new nav();

$(function(){
    fzui.nav.init();
});

