/**
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
        $('.dropdown > .dropdown-right').each(function(i, item){
            var button = $(item).prev();
            $(item).css({left: button.offset().left + button.outerWidth() - $(item).outerWidth()});
            console.log();
        });
        $('.dropdown > button, .dropdown > .button').click(function(event){
            resetContents(event);
            var parent;
            parent = $(this).parent();
            parent.toggleClass('active');
            if($(this).next().hasClass('dropdown-right')) {
                $(this).next().css({left: $(this).offset().left + $(this).outerWidth() - $(this).next().outerWidth()});
            }
            event.stopPropagation();
        });
    }

    $(document).on('click.fzui', resetContents);
}

fzui.dropdowns = new dropdown();

$(function() {
    fzui.dropdowns.init();
})
