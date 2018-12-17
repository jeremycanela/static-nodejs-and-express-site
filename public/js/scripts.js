$(document).foundation();

let url = window.location.pathname.toString();

// Loads the url that is passed in as a parameter
const loadNewPage = (url, pushToHistory = true) => {
	// Disables links while page is transitioning
	$(".link").addClass("disabled");

	$(".main-content").animate({
		marginTop: "100px",
		opacity: 0
	}, 500, () => {
		$(".main-content")
		.load(`${url} .main-content`, () => {
			$(".main-content").animate({
				marginTop: "0px",
				opacity: 100
			}, 500, () => {
				$(".main-content").clearQueue();
				$(".link").removeClass("disabled");
			});
		});
	});

	if(pushToHistory) {
		// Adds link to the history
		history.pushState(url, "Jeremy Canela", url);
	}
};

// Forward and previous page functionability
window.onpopstate = event => {
	if(event.state) {
		loadNewPage(event.state, false);
	}
};

// Links functionability
$(document).on("click", ".link", event => {
	event.preventDefault();

	url = $(event.target).closest("a").attr("href");
	if(url === "" || url === undefined) {
		url = "/";
	}

	if(!$(".link").hasClass("disabled") && url !== window.location.pathname) {
		loadNewPage(url);
	}
});

// On load defaults
$(".main-content").css({
	marginTop: "100px",
	opacity: 0
});

loadNewPage(url);