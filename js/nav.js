/**
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

