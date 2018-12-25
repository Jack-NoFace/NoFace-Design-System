var body = document.querySelector("body"),
	h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
	header = document.querySelector("header"),
	headerButtonOpen = header.querySelector(".header__open"),
	headerButtonClose = header.querySelector(".header__close"),
	headerNav = header.querySelector("nav"),
	headings = document.querySelectorAll("article .title__text"),
	p = document.querySelectorAll("article p"),
	string,
	w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

NodeList.prototype.forEach = Array.prototype.forEach;

const linksToAnchors = document.querySelectorAll('a[href^="#"]');

/* SMOOTH SCROLL TO ANCHOR ID */
function anchorLinkHandler(e) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);

	e.preventDefault();
	const targetID = this.getAttribute("href");
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	var originalTop = distanceToTop(targetAnchor);
	console.log(originalTop);
	originalTop = originalTop - 150;
	console.log(originalTop);

	window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });

	const checkIfDone = setInterval(function() {
		const atBottom =
			window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = "-1";
			targetAnchor.focus();
			window.history.pushState("", "", targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}

linksToAnchors.forEach(each => (each.onclick = anchorLinkHandler));

/* REMOVE ORPHANS */
if (p) {
	p.forEach(function(e) {
		let s = e.innerHTML;
		s = s.replace(/ ([^ ]*)$/, "&nbsp;" + "$1");
		e.innerHTML = s;
	});
}

if (headings) {
	headings.forEach(function(e) {
		let s = e.innerHTML;
		s = s.replace(/ ([^ ]*)$/, "&nbsp;" + "$1");
		e.innerHTML = s;
	});
}

/* MOBILE MENU TOGGLE */
if (headerButtonOpen) {
	headerButtonOpen.addEventListener("click", function(event) {
		event.preventDefault();
		body.classList.add("fixed");
		headerNav.classList.add("show");
	});
}

if (headerButtonClose) {
	headerButtonClose.addEventListener("click", function(event) {
		event.preventDefault();
		body.classList.remove("fixed");
		headerNav.classList.remove("show");
	});
}

/* SET VH UNIT */

function setViewportHeight() {
	var vh = window.innerHeight * 0.01;
	if (vh) {
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}
}

window.onload = setViewportHeight;
window.addEventListener("resize", () => {
	setViewportHeight();
});

window.onscroll = function() {
	changeMenu();
};

function changeMenu() {
	var sbp = window.pageYOffset | document.body.scrollTop;
	if (sbp > 400 && sbp < 900) {
		header.classList.add("header--prepare");
	} else if (sbp > 900) {
		header.classList.remove("header--prepare");
		header.classList.add("header--fixed");
	} else {
		header.classList.remove("header--prepare");
		header.classList.remove("header--fixed");
	}
}

var accordions, accBtns, accContent, el;

accordions = document.querySelectorAll(".accordion");

if (accordions) {
	accBtns = document.querySelectorAll(".accordion button");
	accContent = document.querySelectorAll(".accordion .accordion__content");

	accBtns.forEach(function(el) {
		el.addEventListener("click", function(e) {
			if (this.classList.contains("active")) {
				this.classList.remove("active");
			} else {
				accBtns.forEach(function(el) {
					el.classList.remove("active");
				});
				el.classList.add("active");
			}
		});
	});
}

var flagFn = document.querySelectorAll(".flag button"),
	i,
	r,
	rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/,
	url,
	ytContainer;

if (flagFn) {
	flagFn.forEach(function(el) {
		el.addEventListener("click", function(e) {
			if (el.getAttribute("data-function") === "swap-video") {
				if ((ytContainer = document.querySelector(".youtube"))) {
					if ((url = el.getAttribute("data-link"))) {
						r = url.match(rx);

						if (r[1]) {
							iFrameContainer = ytContainer.querySelector(".youtube__wrapper");

							var iframe = document.createElement("iframe");

							iframe.setAttribute("frameborder", "0");
							iframe.setAttribute("allowfullscreen", "");
							iframe.setAttribute(
								"src",
								"https://www.youtube.com/embed/" +
									r[1] +
									"?rel=0&showinfo=0&autoplay=1"
							);

							iFrameContainer.innerHTML = "";
							iFrameContainer.appendChild(iframe);
						}
					}
				}
			}
		});
	});
}

var ytEmbeds = document.querySelectorAll(".wp-block-embed-youtube");

if (ytEmbeds) {
	var loader = document.createElement("div"),
		ic1 = document.createElement("div"),
		ic2 = document.createElement("div"),
		ic3 = document.createElement("div"),
		ic4 = document.createElement("div");

	loader.appendChild(ic1);
	loader.appendChild(ic2);
	loader.appendChild(ic3);
	loader.appendChild(ic4);
	loader.classList.add("lds-ellipsis");

	ytEmbeds.forEach(function(el) {
		el.appendChild(loader);
	});
}

var locationButtons = document.querySelectorAll(
	`[data-function="location-details"]`
);

if (locationButtons) {
	locationButtons.forEach(el => {
		el.addEventListener("click", () => {
			var id = el.getAttribute("data-id"),
				sliderLightbox = document.querySelector(`[data-id="lightbox-${id}"]`),
				allSliderLightboxes = document.querySelectorAll(`.lightbox`);

			if (sliderLightbox && allSliderLightboxes) {
				allSliderLightboxes.forEach(el => {
					el.classList.remove("lightbox--show");
				});
				sliderLightbox.classList.add("lightbox--show");
			}
		});
	});

	window.onclick = function(event) {
		var modal = document.querySelector(".lightbox--show");
		if (event.target == modal) {
			modal.classList.remove("lightbox--show");
		}
	};
}

var youtube = document.querySelectorAll(".youtube-lazy-load");

for (var i = 0; i < youtube.length; i++) {
	var source =
		"https://img.youtube.com/vi/" + youtube[i].dataset.embed + "/sddefault.jpg";

	var image = new Image();
	image.src = source;
	image.alt = "YouTube Thumbnail";
	image.addEventListener(
		"load",
		(function() {
			youtube[i].appendChild(image);
		})(i)
	);

	youtube[i].addEventListener("click", function() {
		var iframe = document.createElement("iframe");

		iframe.setAttribute(
			"allow",
			"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
		);
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute(
			"src",
			"https://www.youtube.com/embed/" +
				this.dataset.embed +
				"?rel=0&showinfo=0&autoplay=1"
		);

		this.innerHTML = "";
		this.appendChild(iframe);
	});
}

if (Sentry) {
	Sentry.init({
		dsn: "https://c7c70b41c9f646bd9dc4d367d675f27c@sentry.io/1332886"
	});
}
