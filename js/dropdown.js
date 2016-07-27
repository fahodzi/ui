$(function(){
    function resetContents(event) {
        $('.dropdown').each(function(){
            if(event.type == 'click' && event.target.parentNode === $(this)[0]) return;
            console.log(this);
            $(this).removeClass('active');
        });
    }

    $('.dropdown > button').click(function(){
        var parent;
        parent = $(this).parent();
        parent.toggleClass('active');
    });

    $(document).on('click.fzui', resetContents);
});
