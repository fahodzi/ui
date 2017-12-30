/**
 * Dropdown menu javascript
 */
function dropdown() {
    var resetContents = function (event) {
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
}

fzui.dropdowns = new dropdown();

$(function() {
    fzui.dropdowns.init($(document));
})
