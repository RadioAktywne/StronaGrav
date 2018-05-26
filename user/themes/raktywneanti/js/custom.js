$(document).ready(function(){
	function rds(){
	        var url = 'http://listen.radioaktywne.pl:8000/status-json.xsl';
	        
	        $.get(url, function(data){
	        var title = data.icestats.source[0].title;
	        $('.jp-title').html(title);
	        });
	}
	
	var cmmbr=0;
	var tmmbr=4;
	var lmmbr=0;
	var mmmbr=$('.grid.zespol').children('.grid_box').length;
	function switchmembers(){
		for(i=0;i<4;i++){
			$('.aktiv_'+i).removeClass('aktiv_'+i);
			$('#team_'+tmmbr).addClass('aktiv_'+i);
			tmmbr+=1;
			if (tmmbr===mmmbr) tmmbr=0;
		}
	}


	setTimeout(function () {rds();}, 1000);
	setInterval(function () {rds();}, 15000);
	setInterval(function() {switchmembers();}, 15000);
	switchmembers();

	var 	stream = {
			mp3: "http://listen.radiokatywne.pl:8000/ramp3",
			oga: "http://listen.radioaktywne.pl:8000/raogg" },
		ready = false;

	$('#jquery_jplayer').jPlayer({
		ready: function(event){ ready = true; $(this).jPlayer("setMedia", stream); },
		pause: function(){ $(this).jPlayer("clearMedia"); },
		error: function(event){
			if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET){
				$(this).jPlayer("setMedia", stream).jPlayer("play");
			}
		},
		solution: 'html',
		supplied: 'oga, mp3',
		preload: 'none',
		volume: 0.8,
		muted: false,
		cssSelectorAncestor: '#jp_container',
		cssSelector: {
			play: '.jp-play',
			stop: '.jp-stop',
			mute: '.jp-mute',
			unmute: '.jp-unmute',
			volumeBar: '.jp-volume-bar',
			volumeBarBalue: '.jp-volume-bar-value'
		},
	});

});

$(function() {
        var scroll_text;
        var $elmt = $(this);
        scroll_text = setInterval(function() {
            scrollText($elmt);
        }, 40);
}, function() {
        clearInterval(scroll_text);
        $("#headerLiveHolder", this).css({
            left: 0
        });
});

var scrollText = function($elmt) {
	var h1 = $("#headerLiveHolder", $elmt),
            width = h1.width(),                
            left = h1.position().left - 1;
        left = -left > width ? width : left;
        h1.css({
            left: left
        });
};

function loadBody(url){
	$('#body').load(url+' #content');
}
