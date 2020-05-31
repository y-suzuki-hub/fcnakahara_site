AOS.init({
	duration: 800,
	easing: 'slide',
	once: false
});

jQuery(document).ready(function ($) {

	"use strict";




	var siteMenuClone = function () {

		$('.js-clone-nav').each(function () {
			var $this = $(this);
			$this.clone().attr('class', 'site-nav-wrap').appendTo('.site-mobile-menu-body');
		});


		setTimeout(function () {

			var counter = 0;
			$('.site-mobile-menu .has-children').each(function () {
				var $this = $(this);

				$this.prepend('<span class="arrow-collapse collapsed">');

				$this.find('.arrow-collapse').attr({
					'data-toggle': 'collapse',
					'data-target': '#collapseItem' + counter,
				});

				$this.find('> ul').attr({
					'class': 'collapse',
					'id': 'collapseItem' + counter,
				});

				counter++;

			});

		}, 1000);

		// formのデータをjsonに変換して送る
		$('form').submit(function () {
			event.preventDefault(); // 本来のPOSTを打ち消すおまじない
			var data = $('form').serializeArray();  // ①form to json
			data = parseJson(data); // ②json to 欲しい形
			// ③送信

			
			$.post("https://maker.ifttt.com/trigger/send_mail/with/key/bc9lYfWVFmBDOD0FzWdlkT",
				data,
				null
			);
			alert("問い合わせを送信しました。３日以内に、担当コーチよりご連絡いたします。");
			location.reload();
			//event.currentTarget();
			/**
			$.ajax({
                type : 'post',
                url : "https://maker.ifttt.com/trigger/send_mail/with/key/bc9lYfWVFmBDOD0FzWdlkT",
				data: JSON.stringify(data),
                contentType: 'application/json',
                dataType : 'json',
                scriptCharset: 'utf-8',
                success : function(data) {

                    // Success
                    alert("success");
                    alert(JSON.stringify(data));
                    $("#response").html(JSON.stringify(data));
                },
                error : function(data) {

                    // Error
                    alert("error");
                    alert(JSON.stringify(data));
                    $("#response").html(JSON.stringify(data));
				}
			});
			**/
		});

		var getGradeString = function (tag) {
			var ret = "[その他]";
			if (tag == "grade_1") {
				ret = "[１年生]"
			}
			else if (tag == "grade_2") {
				ret = "[２年生]"
			}
			else if (tag == "grade_3") {
				ret = "[３年生]"
			}
			else if (tag == "grade_4") {
				ret = "[４年生]"
			}
			else if (tag == "grade_5") {
				ret = "[５年生]"
			}
			else if (tag == "grade_6") {
				ret = "[６年生]"
			}
			else if (tag == "grade_kids") {
				ret = "[キッズ]"
			}
			else if (tag == "grade_girls") {
				ret = "[少女]"
			}
			return ret;
		}
		  
		// ②変換関数：json to 欲しい形
		var parseJson = function(data) {
			var returnJson = {};
			returnJson["value1"] = `${data[0].value}(${data[1].value})`;
			returnJson["value2"] = `${getGradeString(data[3].value)}${data[2].value}`;
			returnJson["value3"] = `${data[4].value}`;
			/**
			var idx = 0;
			for (idx = 0; idx < data.length; idx++) {
				console.log(data[idx])
				returnJson[data[idx].name] = data[idx].value
			}
			
			 * 0: {name: "name", value: "なまえ"}
				1: {name: "email", value: "mail@gmail.com"}
				2: {name: "subject", value: "たいとる"}
				3: {name: "grade", value: "grade_1"}
				4: {name: "message", value: "本文"}
				length: 5
				__proto__: Array(0) 
			 **/
			return returnJson;
		}

		$('body').on('click', '.arrow-collapse', function (e) {
			var $this = $(this);
			if ($this.closest('li').find('.collapse').hasClass('show')) {
				$this.removeClass('active');
			} else {
				$this.addClass('active');
			}
			e.preventDefault();

		});

		$(window).resize(function () {
			var $this = $(this),
				w = $this.width();

			if (w > 768) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		})

		$('body').on('click', '.js-menu-toggle', function (e) {
			var $this = $(this);
			e.preventDefault();

			if ($('body').hasClass('offcanvas-menu')) {
				$('body').removeClass('offcanvas-menu');
				$this.removeClass('active');
			} else {
				$('body').addClass('offcanvas-menu');
				$this.addClass('active');
			}
		})

		// click outisde offcanvas
		$(document).mouseup(function (e) {
			var container = $(".site-mobile-menu");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('offcanvas-menu')) {
					$('body').removeClass('offcanvas-menu');
				}
			}
		});
	};
	siteMenuClone();


	var sitePlusMinus = function () {
		$('.js-btn-minus').on('click', function (e) {
			e.preventDefault();
			if ($(this).closest('.input-group').find('.form-control').val() != 0) {
				$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) - 1);
			} else {
				$(this).closest('.input-group').find('.form-control').val(parseInt(0));
			}
		});
		$('.js-btn-plus').on('click', function (e) {
			e.preventDefault();
			$(this).closest('.input-group').find('.form-control').val(parseInt($(this).closest('.input-group').find('.form-control').val()) + 1);
		});
	};
	// sitePlusMinus();


	var siteSliderRange = function () {
		$("#slider-range").slider({
			range: true,
			min: 0,
			max: 500,
			values: [75, 300],
			slide: function (event, ui) {
				$("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
			}
		});
		$("#amount").val("$" + $("#slider-range").slider("values", 0) +
			" - $" + $("#slider-range").slider("values", 1));
	};
	// siteSliderRange();



	var siteCarousel = function () {
		if ($('.nonloop-block-13').length > 0) {
			$('.nonloop-block-13').owlCarousel({
				center: false,
				items: 1,
				loop: true,
				stagePadding: 0,
				margin: 0,
				autoplay: true,
				nav: true,
				navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'],
				responsive: {
					600: {
						margin: 0,
						nav: true,
						items: 2
					},
					1000: {
						margin: 0,
						stagePadding: 0,
						nav: true,
						items: 3
					},
					1200: {
						margin: 0,
						stagePadding: 0,
						nav: true,
						items: 4
					}
				}
			});
		}

		$('.slide-one-item').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			autoplay: true,
			pauseOnHover: false,
			nav: true,
			navText: ['<span class="icon-keyboard_arrow_left">', '<span class="icon-keyboard_arrow_right">']
		});

		// $('.slide-one-item-alt').owlCarousel({
		//   center: false,
		//   items: 1,
		//   loop: true,
		// stagePadding: 0,
		// smartSpeed: 700,
		//   margin: 0,
		//   autoplay: true,
		//   pauseOnHover: false,

		// });

		// $('.slide-one-item-alt-text').owlCarousel({
		//   center: false,
		//   items: 1,
		//   loop: true,
		// stagePadding: 0,
		// smartSpeed: 700,
		//   margin: 0,
		//   autoplay: true,
		//   pauseOnHover: false,
		// });

		$('.slide-one-item-alt').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			autoplay: true,
			pauseOnHover: true,
			onDragged: function (event) {
				console.log('event : ', event.relatedTarget['_drag']['direction'])
				if (event.relatedTarget['_drag']['direction'] == 'left') {
					$('.slide-one-item-alt-text').trigger('next.owl.carousel');
				} else {
					$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
				}
			}
		});
		$('.slide-one-item-alt-text').owlCarousel({
			center: false,
			items: 1,
			loop: true,
			stagePadding: 0,
			margin: 0,
			smartSpeed: 1000,
			autoplay: true,
			pauseOnHover: true,
			onDragged: function (event) {
				console.log('event : ', event.relatedTarget['_drag']['direction'])
				if (event.relatedTarget['_drag']['direction'] == 'left') {
					$('.slide-one-item-alt').trigger('next.owl.carousel');
				} else {
					$('.slide-one-item-alt').trigger('prev.owl.carousel');
				}
			}
		});


		$('.custom-next').click(function (e) {
			e.preventDefault();
			$('.slide-one-item-alt').trigger('next.owl.carousel');
			$('.slide-one-item-alt-text').trigger('next.owl.carousel');
		});
		$('.custom-prev').click(function (e) {
			e.preventDefault();
			$('.slide-one-item-alt').trigger('prev.owl.carousel');
			$('.slide-one-item-alt-text').trigger('prev.owl.carousel');
		});

	};
	siteCarousel();

	var siteStellar = function () {
		$(window).stellar({
			responsive: false,
			parallaxBackgrounds: true,
			parallaxElements: true,
			horizontalScrolling: false,
			hideDistantElements: false,
			scrollProperty: 'scroll'
		});
	};
	// siteStellar();

	var siteCountDown = function () {

		$('#date-countdown').countdown('2020/10/10', function (event) {
			var $this = $(this).html(event.strftime(''
				+ '<span class="countdown-block"><span class="label">%w</span> weeks </span>'
				+ '<span class="countdown-block"><span class="label">%d</span> days </span>'
				+ '<span class="countdown-block"><span class="label">%H</span> hr </span>'
				+ '<span class="countdown-block"><span class="label">%M</span> min </span>'
				+ '<span class="countdown-block"><span class="label">%S</span> sec</span>'));
		});

	};
	siteCountDown();

	var siteDatePicker = function () {

		if ($('.datepicker').length > 0) {
			$('.datepicker').datepicker();
		}

	};
	siteDatePicker();

	var siteSticky = function () {
		$(".js-sticky-header").sticky({ topSpacing: 0 });
	};
	siteSticky();

	// navigation
	var OnePageNavigation = function () {
		var navToggler = $('.site-menu-toggle');
		$("body").on("click", ".main-menu li a[href^='#'], .smoothscroll[href^='#'], .site-mobile-menu .site-nav-wrap li a", function (e) {
			e.preventDefault();

			var hash = this.hash;

			$('html, body').animate({
				'scrollTop': $(hash).offset().top
			}, 600, 'easeInOutExpo', function () {
				window.location.hash = hash;
			});

		});
	};
	OnePageNavigation();

	var siteScroll = function () {



		$(window).scroll(function () {

			var st = $(this).scrollTop();

			if (st > 100) {
				$('.js-sticky-header').addClass('shrink');
			} else {
				$('.js-sticky-header').removeClass('shrink');
			}

		})

	};
	siteScroll();


	var siteIstotope = function () {
		/* activate jquery isotope */
		var $container = $('#posts').isotope({
			itemSelector: '.item',
			isFitWidth: true
		});

		$(window).resize(function () {
			$container.isotope({
				columnWidth: '.col-sm-3'
			});
		});

		$container.isotope({ filter: '*' });

		// filter items on button click
		$('#filters').on('click', 'button', function () {
			var filterValue = $(this).attr('data-filter');
			$container.isotope({ filter: filterValue });
			$('#filters button').removeClass('active');
			$(this).addClass('active');
		});
	}

	siteIstotope();


	$('.fancybox').on('click', function () {
		var visibleLinks = $('.fancybox');

		$.fancybox.open(visibleLinks, {}, visibleLinks.index(this));

		return false;
	});


	var pagetop = $('#page_top');
	pagetop.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {  //100pxスクロールしたら表示
			pagetop.fadeIn();
		} else {
			pagetop.fadeOut();
		}
	});
	pagetop.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500); //0.5秒かけてトップへ移動
		return false;
	});

});