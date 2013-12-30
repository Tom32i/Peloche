function resizeHandler()
{	
	mobile = w.width() <= 768;
	h = w.height();

	hideAddressBar();

	if(!mobile)
	{
		m.height(h);
	}
	else
	{
		m.height("auto");
	}
}

function onMove(event)
{
	if(mobile || (touch && event.touches.length == 1))
	{
		var top = $(window).scrollTop();
		var new_link = Math.floor(top / 200) + 1;

		if(top == 0)
		{
			new_link = 0;
		}
		else if(top == (total*200 - h) - 20)
		{
			new_link = total - 1;
		}

		if(new_link != current_link)
		{
			m.find('.case.active').removeClass("active");
			$(main.children[new_link]).addClass("active");
			current_link = new_link;
		}
	}
}

function hideAddressBar()
{
	if(mobile)
	{
		setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
	}
}

var main = document.getElementById("main");
var total = main.children.length;
var mobile = false;
var touch = false;
var h, w, m, links;
var current_link = 0;
var new_link = 0;

document.body.onresize = resizeHandler;

$(window).load(function ()
{
	w = $(window);
	m = $(main);
	touch = "ontouchstart" in window;

	resizeHandler();
	$("body").removeClass("loading");

	if (touch)
	{
		window.addEventListener("orientationchange", resizeHandler );
		window.addEventListener('touchmove', onMove, false); 
	}
	else
	{
		$(window).scroll(onMove);
	}
	//init();
});