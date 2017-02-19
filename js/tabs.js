/**
 * Implements the highlighting of the current tab or pill for tab and pill
 * user interfaces.
 */
function tabs() {
    this.init = function() {
        $('.tabs a').click(function(event){
            var parent = $(event.target).parent();
            parent.parent().find('li').removeClass('active')
            parent.addClass('active');
        })
    }
}

fzui.tabs = new tabs();

$(function(){
    fzui.tabs.init();
});
