//Static Part

$(document).ready(function(){
	$("a").on('click', function(event) {
		if (this.hash !== "") {
		    event.preventDefault();
		    var hash = this.hash;
		    $('html, body').animate({
		        scrollTop: $(hash).offset().top-60
		    }, 800, function(){
		        window.location.hash = hash;
		    });
		}
	});
});

var allPlats=["PlayStation Vita", "iPad", "Xbox 360", 
"PlayStation 3", "Macintosh", "PC", "iPhone", "Nintendo DS", 
"Nintendo 3DS", "Android", "Wii", "PlayStation 4", "Wii U", 
"Linux", "PlayStation Portable", "PlayStation", "Nintendo 64", 
"Saturn", "Lynx", "Game Boy", "Game Boy Color", 
"NeoGeo Pocket Color", "Game.Com", "Dreamcast", "Dreamcast VMU", 
"WonderSwan", "Arcade", "Nintendo 64DD"];

var genre=["Platformer", "Puzzle", "Sports", "Strategy", "Fighting", 
"RPG", "Action, Adventure", "Adventure", "Action", 
"Action, RPG", "Shooter", "Music", "Board", "Racing", "Strategy, RPG", 
"Racing, Action", "Shooter, RPG", "Simulation", "Action, Simulation", 
"Flight, Action", "Puzzle, Action", "Action, Compilation", 
"Educational, Puzzle", "Wrestling", "Fighting, Action", 
"Productivity", "Sports, Simulation", "Music, Action", "Sports, Action", 
"Party", "Battle", "Puzzle, Adventure", "Puzzle, Word Game", 
"Card, Battle", "Simulation, Adventure", "Compilation", "Flight", 
"Pinball", "Hunting", "Casino", "Sports, Racing", "Fighting, Compilation", 
"Flight, Simulation", "Trivia", "Action, Platformer", "Other", 
"Virtual Pet", "Music, Editor", "Sports, Editor", "Racing, Simulation", 
"RPG, Editor"];

for(var i=0;i<allPlats.length;i++) {
	$("#drop2 div").append("<label><input type='checkbox' name='z'>"+allPlats[i]+"</label><br>");
}

for(var i=0;i<genre.length;i++) {
	$("#drop3 div").append("<label><input type='checkbox' name='y'>"+genre[i]+"</label><br>");
}

var genreIcons={
	"Platformer": "assets/css/icons/platform.svg",
	"Puzzle": "assets/css/icons/jigsaw.svg",
	"Sports": "assets/css/icons/baseball.svg",
	"Strategy": "assets/css/icons/strategy.svg",
	"Fighting": "assets/css/icons/swords.svg",
	"RPG": "assets/css/icons/roleplaying.svg",
	"Action, Adventure": "assets/css/icons/trekking.svg",
	"Adventure": "assets/css/icons/map.svg",
	"Action": "assets/css/icons/fist.svg",
	"Action, RPG": "assets/css/icons/shield.svg",
	"Shooter": "assets/css/icons/goal.svg",
	"Music": "assets/css/icons/music.svg",
	"Board": "assets/css/icons/dices.svg",
	"Racing": "assets/css/icons/steering.svg",
	"Strategy, RPG": "assets/css/icons/adventure.svg",
	"Racing, Action": "assets/css/icons/chronometer.svg",
	"Shooter, RPG": "assets/css/icons/shooter.svg",
	"Simulation": "assets/css/icons/eye.svg",
	"Action, Simulation": "assets/css/icons/simulator.svg",
	"Flight, Action": "assets/css/icons/airplane.svg",
	"Puzzle, Action": "assets/css/icons/ninja.svg",
	"Action, Compilation": "assets/css/icons/behavior.svg",
	"Educational, Puzzle": "assets/css/icons/chalkboard.svg",
	"Wrestling": "assets/css/icons/wrestling.svg",
	"Fighting, Action": "assets/css/icons/boxing.svg",
	"Productivity": "assets/css/icons/gym.svg",
	"Sports, Simulation": "assets/css/icons/photographer.svg",
	"Music, Action": "assets/css/icons/muaction.svg",
	"Sports, Action": "assets/css/icons/baseball.svg",
	"Party": "assets/css/icons/confetti.svg",
	"Battle": "assets/css/icons/swords.svg",
	"Puzzle, Adventure": "assets/css/icons/ninja.svg",
	"Puzzle, Word Game":"assets/css/icons/scrabble.svg",
	"Card, Battle": "assets/css/icons/cards.svg",
	"Simulation, Adventure": "assets/css/icons/simulator.svg",
	"Compilation": "assets/css/icons/compiler.svg",
	"Flight": "assets/css/icons/airplane.svg",
	"Pinball": "assets/css/icons/pinball.svg",
	"Hunting": "assets/css/icons/weapons.svg",
	"Casino": "assets/css/icons/casino-chips.svg",
	"Sports, Racing": "assets/css/icons/chronometer.svg",
	"Fighting, Compilation": "assets/css/icons/boxing.svg",
	"Flight, Simulation": "assets/css/icons/airplane.svg",
	"Trivia": "assets/css/icons/question.svg",
	"Action, Platformer": "assets/css/icons/platform.svg",
	"Other": "assets/css/icons/paper-plane.svg",
	"Virtual Pet": "assets/css/icons/dog.svg",
	"Music, Editor": "assets/css/icons/equalizer.svg",
	"Sports, Editor": "assets/css/icons/baseball.svg",
	"Racing, Simulation": "assets/css/icons/steering.svg",
	"RPG, Editor": "assets/css/icons/roleplaying.svg",
	"": "assets/css/icons/magic-wand.svg"
};

//Dynamic Part

var data=[],presentData=document.querySelector("#mainData .row");
var workData=[],titles=[];
var requestURL ="http://starlord.hackerearth.com/gamesext";
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
	var s = request.response;

	for(var i=0;i<s.length;i++) {
		data.push(s[i]);
		titles.push(data[i].title.toString());
	}
	workData=data.slice(0);
	whatNow(workData);
	autocomplete(document.getElementById("myInput"), titles);
}

function whatNow(dataTo) {
	$("#mainData .row").html("");
	$("#paging").html("");
	console.log(dataTo.length);
	for(var i=0;i<48&&i<dataTo.length;i++) {
		var myH5 = document.createElement('h5'),classEdu;
		myH5.textContent = dataTo[i]['title'];
		var iconPos=Object.keys(genreIcons),pathIcon;
		for(var j=0;j<52;j++) {
			if(dataTo[i]['genre']==iconPos[j]) {
				pathIcon=genreIcons[iconPos[j]];
				break;
			}
		}
		if((i%4)==0)
			classEdu="education";
		else if((i%4)==1)
			classEdu="education1";
		else if((i%4)==2)
			classEdu="education2";
		else
			classEdu="education3";
		presentData.innerHTML+="<div class='col-lg-3 col-md-4 col-sm-6'><span><a href='javaScript:void(0)' class='card "+classEdu+"'><div class='circle'><img src='"+pathIcon+"'></div><h6>"+dataTo[i]['genre']+"</h6><div class='belowOne'><h5>"+dataTo[i]['title']+"</h5></div><div><div><span class='stars'>"+dataTo[i].score+"</span></div><div class='circleText'>"+dataTo[i].score+"</div></div><br><div class='questans'><div class='quest'>Platform: <span class='ans'>"+dataTo[i].platform+"</span></div><div class='quest'>Release Year: <span class='ans'>"+dataTo[i].release_year+"</span></div></div></a></span></div>";
	}
	$('span.stars').stars();
	addLiHtml(dataTo,dataTo.length);
};

function addLiHtml(dat,len) {
	var noOf=parseInt(Math.ceil(len/48));
	$('#paging').bootpag({
	    total: noOf,
	    page: 1,
	    maxVisible: 10,
	    leaps: true,
	    firstLastUse: true,
	    wrapClass: 'pagination',
	    activeClass: 'active',
	    disabledClass: 'disabled',
	    nextClass: 'next',
	    prevClass: 'prev',
	    lastClass: 'last',
	    firstClass: 'first'
	}).on("page", function(event, num){
		$("#mainData .row").html("");
		for(var i=(num-1)*48;i<dat.length&&i<num*48;i++) {
			var myH5 = document.createElement('h5'),classEdu;
			myH5.textContent = dat[i]['title'];
			var iconPos=Object.keys(genreIcons),pathIcon;
			for(var j=0;j<52;j++) {
				if(dat[i]['genre']===iconPos[j]) {
					pathIcon=genreIcons[iconPos[j]];
					break;
				}
			}
			if((i%4)==0)
				classEdu="education";
			else if((i%4)==1)
				classEdu="education1";
			else if((i%4)==2)
				classEdu="education2";
			else
				classEdu="education3";
			presentData.innerHTML+="<div class='col-lg-3 col-md-4 col-sm-6'><span><a href='javaScript:void(0)' class='card "+classEdu+"'><div class='circle'><img src='"+pathIcon+"'></div><h6>"+dat[i]['genre']+"</h6><div class='belowOne'><h5>"+dat[i]['title']+"</h5></div><div><div><span class='stars'>"+dat[i].score+"</span></div><div class='circleText'>"+dat[i].score+"</div></div><br><div class='questans'><div class='quest'>Platform: <span class='ans'>"+dat[i].platform+"</span></div><div class='quest'>Release Year: <span class='ans'>"+dat[i].release_year+"</span></div></div></a></span></div>";
		}
		$('span.stars').stars(); 
	});
}

// autocomplete+ search bar

function autocomplete(inp, arr) {
	var currentFocus;
	inp.addEventListener("input", function(e) {
		var a, b, i, val = this.value;
		closeAllLists();
		if (!val) { return false;}
		currentFocus = -1;
		a = document.createElement("DIV");
		a.setAttribute("id", this.id + "autocomplete-list");
		a.setAttribute("class", "autocomplete-items");
		this.parentNode.appendChild(a);
		for (i = 0; i < arr.length; i++) {
		    if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
			    b = document.createElement("DIV");
			    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
			    b.innerHTML += arr[i].substr(val.length);
			    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
			    b.addEventListener("click", function(e) {
			        inp.value = this.getElementsByTagName("input")[0].value;
			        closeAllLists();
			    });
			    a.appendChild(b);
		    }
		}
	});
	function closeAllLists(elmnt) {
		var x = document.getElementsByClassName("autocomplete-items");
		for (var i = 0; i < x.length; i++) {
		    if (elmnt != x[i] && elmnt != inp) {
		        x[i].parentNode.removeChild(x[i]);
		    }
		}
	}
	document.addEventListener("click", function (e) {
		closeAllLists(e.target);
	});
}

$(".autocomplete button").on("click", function(event) {
	event.preventDefault();
	if($("#myInput").val()!=="") {
		var substring=$("#myInput").val().toString().toLowerCase();
		var renderData=[];
		for(var i=0;i<workData.length;i++) {
			if((workData[i]["title"].toString().toLowerCase().indexOf(substring))!=-1) 
				renderData.push(workData[i]);
		}
		$("#myInput").val("");
		whatNow(renderData);
	}
});

$(".autocomplete button").keypress(function (e) {
	if($("#myInput").val()!=="") {
	 	var key = e.which;
	 	if(key == 13) {
		    var substring=$("#myInput").val().toString().toLowerCase();
			var renderData=[];
			for(var i=0;i<workData.length;i++) {
				if((workData[i]["title"].toString().toLowerCase().indexOf(substring))!=-1) 
					renderData.push(workData[i]);
			}
			$("#myInput").val("");
			whatNow(renderData);
	  	}
	}
});

// Filters

$("#filterIcon").on("click",function() {
	var workData2=[],flag1=0,arr1=[],arr2=[],arr3=[],fin=[];
	for(var i=0;i<allPlats.length;i++) {
		if($("#drop2 input")[i].checked) {
			flag1=1;
			var gamePlatform=$("#drop2 label")[i].innerText;
			for(var j=0;j<data.length;j++) {
				if(data[j].platform===gamePlatform) {
					arr1.push(parseInt(j));
				}
			}
		}
	}
	if(flag1===0) {
		for(var i=0;i<data.length;i++)
			arr1.push(parseInt(i));
	}
	flag1=0;
	for(var i=0;i<genre.length;i++) {
			if($("#drop3 input")[i].checked) {
			flag1=1;
			var gamePlatform=$("#drop3 label")[i].innerText;
			for(var j=0;j<data.length;j++) {
				if(data[j].genre===gamePlatform) {
					arr2.push(parseInt(j));
				}
			}
		}
	}
	if(flag1===0) {
		for(var i=0;i<data.length;i++)
			arr2.push(parseInt(i));
	}
	arr1.sort(function(a,b) {
		return a-b;
	});
	arr2.sort(function(a,b) {
		return a-b;
	});
	var result = [];
	while( arr1.length > 0 && arr2.length > 0 ) {  
	    if(arr1[0]<arr2[0]) { arr1.shift(); }
	    else if(arr1[0]>arr2[0]) { arr2.shift(); }
	    else
	    {
		    result.push(arr1.shift());
		    arr2.shift();
	    }
	}
	if($("#ch1:checked").val()==="on") {
		for(var j=0;j<data.length;j++) {
			if(data[j].editors_choice==="Y") {
				arr3.push(parseInt(j));
			}
		}
	}
	else if($("#ch2:checked").val()==="on") {
		for(var j=0;j<data.length;j++) {
			if(data[j].editors_choice==="N") {
				arr3.push(parseInt(j));
			}
		}
	}
	if(arr3.length===0) {
		for(var i=0;i<2499;i++)
			arr3.push(parseInt(i));
	}
	flag1=0;
	arr3.sort(function(a,b) {
		return a-b;
	});
	result.sort(function(a,b) {
		return a-b;
	});
	while( arr3.length > 0 && result.length > 0 ) {  
	    if(arr3[0]<result[0]) { arr3.shift(); }
	    else if(arr3[0]>result[0]) { result.shift(); }
	    else
	    {
		    fin.push(arr3.shift());
		    result.shift();
	    }
	}
	for(var i=0;i<fin.length;i++) {
		workData2.push(data[fin[i]]);
	}
	workData=workData2.slice(0);

	if($("#sort1:checked").val()==="on") {
			workData.sort(function(a, b) {
		    return a.score - b.score;
		});
	}
	else if($("#sort2:checked").val()==="on") {
		workData.sort(function(a, b) {
		    return b.score - a.score;
		});
	}
	whatNow(workData);
	var subtitles=[];
	for(var i=0;i<workData2.length;i++)
		subtitles.push(workData2[i].title);
	autocomplete(document.getElementById("myInput"), subtitles);
});

// Reset filter

$("#resetFilter").on("click",function() {
	$('.dropdown input').prop('checked', false);
	workData=data.slice(0);
	whatNow(workData);
	autocomplete(document.getElementById("myInput"), titles);
});

// Ratings(Star) Feature

$.fn.stars = function() {
    return $(this).each(function() {
        $(this).html($('<span />').width(Math.max(0, (Math.min(10, parseFloat($(this).html())))) * 16));
    });
}

// To add "No result found" menu.....


// extra part(Tried and refused)

/*function addLihtml(len) {
	$("#paging div").pagination({
        items: len,
        itemsOnPage: 24,
    });
}
*/

/*function addLiHtml(dataLength) {
	var y=document.getElementsByClassName("pagination")[0];
	$(".pagination a").off("click");
	$("a").off("click");
	y.innerHTML="";
	y.innerHTML+=("<a href='#filterNavContain' id='previousButton'>&laquo;</a>");
	var pages=parseInt(Math.ceil(dataLength/24));
	for(var i=1;i<=pages;i++) {
		if(i!=1)
			y.innerHTML+="<a href='#filterNavContain'>" + i + "</a>";
		else
			y.innerHTML+="<a href='#filterNavContain' class='active'>" + i + "</a>";
	}
	y.innerHTML+="<a href='#filterNavContain' id='nextButton'>&raquo;</a>";
	addClick(pages);
};

function addClick(noOfPages) {
	$(".pagination a").on("click",function() {
		if($(this).hasClass("active")||$(this).index()==0||$(this).index()==noOfPages+1) {
			return false;
		}
		else {
			var curr=$(this).index();
			$(".pagination a").removeClass("active");
			$(this).addClass("active");
			$("#mainData h5").hide();
			for(var i=24*curr-24;i<24*curr;i++) {
				$("#mainData h5:eq("+i+")").show();
			}
		}
	});
};*/


	/*inp.addEventListener("keydown", function(e) {
		var x = document.getElementById(this.id + "autocomplete-list");
		if (x) x = x.getElementsByTagName("div");
		if (e.keyCode == 40) {
		    currentFocus++;
		    addActive(x);
        } else if (e.keyCode == 38) {
		    currentFocus--;
		    addActive(x);
		} else if (e.keyCode == 13) {
		    e.preventDefault();
		    if (currentFocus > -1) {
		        if (x) x[currentFocus].click();
		    }
		}
	});
	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = (x.length - 1);
		x[currentFocus].classList.add("autocomplete-active");
	}
	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
		    x[i].classList.remove("autocomplete-active");
		}
	}*/



/*function addClick() {
	var x=document.querySelectorAll(".pagination a");
	for(var i=1;i<x.length;i++) {
		x[i].addEventListener("click",function() {
			for(var j=1;j<x.length;j++) {
				x[j].classList.remove("active");
			}
			this.classList.add("active");
		});
	}
};
*/




/*$("#nextButton").on("click",function() {
		var curPage=$(".pagination a.active").index();
		if(curPage==5) {
			return false;
		}
		else {
			curPage++;
			$(".pagination a").removeClass("active");
			$("#mainData h5").hide();
			$(".pagination a:eq("+(curPage-1)+")").addClass("active");
			for(var i=24*curPage-24;i<24*curPage;i++) {
				$("#mainData h5:eq("+i+")").show();
			}
		}
	});
	$("#previousButton").on("click",function() {
		var curPage=$(".pagination a.active").index();
		if(curPage==1) {
			return false;
		}
		else {
			curPage--;
			$(".pagination a").removeClass("active");
			$("#mainData h5").hide();
			$(".pagination a:eq("+(curPage-1)+")").addClass("active");
			for(var i=24*curPage-24;i<24*curPage;i++) {
				$("#mainData h5:eq("+i+")").show();
			}
		}
	});*/

/*

*/
/*function loadJsonFile() {
	$.getJSON("gamesext.json", function (value) {
	    data=value;
	    
	});	
}*/







/*
var init=24*(i-1);
			for(var i=init;i<(init+24)&&i<=200;i++) {
				console.log(data[i]['title']);
			}*/