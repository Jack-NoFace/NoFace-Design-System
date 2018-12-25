(function($) {
	$(".slider").slick({
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		centerMode: true,
		dots: false,
		infinite: true,
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					centerMode: true,
					slidesToShow: 1
				}
			}
		]
	});
})(jQuery);

NodeList.prototype.forEach = Array.prototype.forEach;

var showLightboxButtons = document.querySelectorAll(
	`[data-function="showLightbox"]`
);

if (showLightboxButtons) {
	var flag = 0;
	showLightboxButtons.forEach(el => {
		el.addEventListener(
			"mousedown",
			() => {
				flag = 0;
			},
			false
		);
		el.addEventListener(
			"mousemove",
			() => {
				flag = 1;
			},
			false
		);
		el.addEventListener(
			"mouseup",
			() => {
				if (flag === 0) {
					var id = el.getAttribute("data-id"),
						sliderLightbox = document.querySelector(
							`[data-id="lightbox-${id}"]`
						),
						allSliderLightboxes = document.querySelectorAll(`.lightbox`);

					if (sliderLightbox && allSliderLightboxes) {
						allSliderLightboxes.forEach(el => {
							el.classList.remove("lightbox--show");
						});
						sliderLightbox.classList.add("lightbox--show");
					}
				}
			},
			false
		);
	});

	window.onclick = function(event) {
		var modal = document.querySelector(".lightbox--show");
		if (event.target == modal) {
			modal.classList.remove("lightbox--show");
		}
	};
}
