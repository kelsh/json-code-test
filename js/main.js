$(window).ready(function(){

// get json data -> if success load news items and set event handler for scroll 
// if scroll event says window is at bottom of the page -> load more news stories


	var contain = $("#container");
	var bottom = $("#page-bottom");

	//iterator
	var i = 0;

	//holds our json data
	var data;

	//state to see if we need more stories
	var loadMore = true;

	//personal note
	console.log("this is my all purpose blank project template, ignore any weird plugins or css styles you may see.");


	//iterator holds last news story loaded. incriments each time new one loads.  
	//each time we load a new story we have to check if its gone past bottom of the window with checkpage();
	//if it has, we can stop loading new stories based on loadmore = false
	function loadMoreNews(){
		
		while(i<data.length && loadMore === true){
					var newStory = document.createElement('div') ;
					newStory.className = 'story in';
					var a = $(newStory).append('<span class="title">'+data[i].title+'</span><br />'+data[i].published );
					contain.append(a);
					i++
					checkPage();

		};
	}


	//checks to see where we are in the page, and whether we need to load more or not
	function checkPage(){
		
		if($(window).scrollTop() + $(window).height() >= $(document).height() -40 ) {
			console.log("loading more");
			loadMore = true;
       		loadMoreNews();
   		}else{
   			console.log("not loading more");
   			loadMore = false;
   		}
	}
	
	//get the json data and start the process, or error out
	$.get('http://www.stellarbiotechnologies.com/media/press-releases/json',function(d){
		
		console.log("success"+d);

	}).done(function(d){
		data=d["news"]
		loadMoreNews();
		//every time page scrolls we want to see if we need to load more.  
		//we only need to check if the json has loaded 
		$(document).scroll(function(){
			checkPage();
		});
	}).fail(function(){
		alert( "get didn't work" );
	});
});