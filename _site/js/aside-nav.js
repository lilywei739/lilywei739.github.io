/*eslint-env jquery */
(function(global){
    var $h2List = $('#main-cont').find('h2'),
        anchorArr = [],
        li_html = '',
        layoutTop = 0;
    
    $h2List.each(function (i) {
        var anchorId = 'anchor' + i;
        this.id = anchorId;
        anchorArr.push({id: anchorId, text: $.trim($(this).text())});
    });
    
    $.each(anchorArr, function (i, value) {
        li_html = li_html + '<li><a href="#' + value.id + '">' + value.text + '</a></li>';
    });
    
    $('#sidebar').find('.side-nav').html(li_html);

/*
    $(document).scroll(function () {
	if ($(window).scrollTop() <= 100) {
	   layoutTop = 150;
	} else {
	   layoutTop = $(window).scrollTop() + 100;
	}
	$('#sidebar').css({
	   'position': 'absolute',
	   'right': 0,
	   'top': layoutTop
	});
    })
*/

})(window);
