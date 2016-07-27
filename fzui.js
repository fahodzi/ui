$(function(){

    var parent;

    function resetContents(event) {
        /*if(event.type == 'click' && $.contains(parent[0], event.target)) return;
        console.log(event.target.parentNode, parent[0]);
        $('.dropdown').removeClass('active');*/
        $('.dropdown').each(function(){
            if(event.type == 'click' && event.target.parentNode === $(this)[0]) return;
            console.log(this);
            $(this).removeClass('active');
        });
    }

    $('.dropdown > button').click(function(){
        parent = $(this).parent();
        parent.toggleClass('active');
    });

    $(document).on('click.fzui', resetContents);
});
