// JavaScript Document

$(function() {
	$("dl.resultBox > dt > a").click(function(){
		$(this).parent().next().slideToggle();
		if($(this).text() == "▼詳細を見る"){
			$(this).text("▲閉じる");
		} else {
			$(this).text("▼詳細を見る");
		}
		return false;
	});
});
