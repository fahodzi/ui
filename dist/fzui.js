$(function(){
    function resetContents(event) {
        $('.dropdown').each(function(){
            if(event.type == 'click' && event.target.parentNode === $(this)[0]) return;
            $(this).removeClass('active');
        });
    }

    $('.dropdown > button').click(function(event){
        var parent;
        parent = $(this).parent();
        parent.toggleClass('active');
        event.stopPropagation();
    });

    $(document).on('click.fzui', resetContents);
});
