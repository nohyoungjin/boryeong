$(function() {

	// init

	$.fn.device()
	$.fn.gnbSize()

	navi()
	smallNav()
	search()

	mainVisualSlider()
	isotopeInit()
	tab()
	scrollFlag()
	popup()

	capty()
	faq()

	// on load

    $(window).load(function() {

		$('body').addClass('load')

	})

	// window resize function

	$(window).resize(function() {

		$.fn.device()
		$.fn.gnbSize()

	})

	// gnb pc

	function navi() {

		$('#gnb').on('mouseenter', '> .box > ul > li', function() {

			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li a').removeClass('active')
				$(this).find('a').addClass('active')
				$(this).parents('.h_group').stop().animate({ 'height': '300px' }, 300)
				$('#gnb .sub_menu').show()
			}

		})

		$('.h_group').on('mouseleave', function() {

			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li a').removeClass('active')
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({ 'height': '104px' }, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide()
				})
			}

		})

		// gnb keyboard accessibility
		
		$('#gnb').on('focusin', '> .box > ul > li > a', function() {

			if ($('body').data('device') != 'mobile') {
				if ($('.h_group').hasClass('on') == false) {
					$(this).parents('.h_group').stop().animate({ 'height': '300px' }, 300)
					$('#gnb .sub_menu').show()
				}
			}

		})

		$(document).on('focus', '.h_group h1 a, .lnb-nav li a, .slick-prev', function() {

			if ($('body').data('device') != 'mobile') {
				$('#gnb > .box > ul > li').parents('.h_group').stop().animate({ 'height': '104px' }, 300, function() {
					$('#gnb > .box > ul > li').siblings().children('.sub_menu').hide()
				})
			}

		})

	}
	
	// gnb mobile

	function smallNav() {

		$('.btn_menu').on('click', function() {

			var overflowChk = $('body').css('overflow')
			var deviceHeight = $(window).height()

			if (overflowChk == 'hidden') {
				$('body').css({
					'overflow': 'visible',
					'height': 'auto'
				})
			} else {
				$('body').css({
					'overflow': 'hidden',
					'height': deviceHeight
				})
			}

			$('#gnb > .box').css('display', 'block')
			$(this).next().stop().animate({ 'right': '0%' }, 300)
			$('#gnb > .dim').fadeIn()

		})

		$('#gnb > .box').on('click', '> ul > li > a', function() {

			if ($('body').data('device') == 'mobile') {

				$('#gnb > .box > ul > li > .sub_menu > ul').filter(':not(:animated)').slideUp('fast')
				$(this).parent().find('> .sub_menu > ul').filter(':not(:animated)').slideToggle()
				
				if ($(this).parent().hasClass('current')) {
					$(this).parent().removeClass('current')
					return
				}

				$('#gnb > .box > ul > li').removeClass('current')
				$(this).parent().toggleClass('current')

			}

		})

		$('#gnb').on('click', '> .dim, > .box > .btn_close', function() {

			$('body').css('overflow', 'visible')
			$('#gnb > .dim').hide()
			
			$('#gnb > .box').stop().animate({ 'right': '-80%' }, 300, function() { 
				$('#gnb > .box').css('display', 'none')
			})

			$('#gnb .btn_menu').focus()

		})

	}

	// search

	function search() {

		$('#header .search_area .sizing_wrap .btn_search').click(function() {

			if (!$(this).hasClass('on')) {
				
				$('#header .search_area .sizing_wrap input').show()
				$(this).addClass('on')
				
				setTimeout(function() {
					$('#header .search_area .sizing_wrap').addClass('show')
					$('#header .search_area .sizing_wrap input').focus()
				}, 10)

				if ($('body').data('device') == 'mobile') {
					$('#header .h_group > div > h1 > a > img').css('display', 'none')
				}

				return false

			}

		})

		$('#header .search_area .sizing_wrap .btn_cl').click(function() {

			$('#header .search_area .sizing_wrap').removeClass('show')
			$('#header .search_area .sizing_wrap a').removeClass('on')
			$('#header .search_area .sizing_wrap a.btn_search').focus()
			$('#header .h_group > div > h1 > a > img').css('display', 'block')

		})

	}

	// main visual slider

	function mainVisualSlider() {

		if (!$('body').hasClass('home')) { return }

		$('.visual').slick({
			accessibility: false,
			arrows: true,
			autoplay: true,
			autoplaySpeed: 5000,
			dots: true,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1
		})

		// visual pause, play (pc)

		$('.visual_btn .btn_play').on('click', function() {

			var $pauseBtn = $(this)

			if ($pauseBtn.hasClass('on')) {
				$('.visual.web').slick('slickPlay')
				$(this).text('정지')
				$pauseBtn.removeClass('on')
			} else {
				$('.visual.web').slick('slickPause')
				$(this).text('재생')
				$pauseBtn.addClass('on')
			}

		})

		// visual pause, play (mobile)

		$('.visual_btn_mo .btn_play').on('click', function() {

			var $pauseBtn = $(this)

			if ($pauseBtn.hasClass('on')) {
				$('.visual.mobile').slick('slickPlay')
				$(this).text('정지')
				$pauseBtn.removeClass('on')
			} else {
				$('.visual.mobile').slick('slickPause')
				$(this).text('재생')
				$pauseBtn.addClass('on')
			}

		})

	}

	// isotope init

	function isotopeInit() {

		if (!$('body').hasClass('home')) { return }

		var $container = $('.isotope').isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: 1
			},
			getSortData: {
				name: '.name',
				symbol: '.symbol',
				number: '.number parseInt',
				category: '[data-category]',
				weight: function(itemElem) {
					var weight = $(itemElem).find('.weight').text()
					return parseFloat(weight.replace(/[\(\)]/g, ''))
				}
			}
		})

		// bind sort button click

		/* $('#sorts').on('click', 'button', function() {
			var sortByValue = $(this).attr('data-sort-by')
			$container.isotope({ sortBy: sortByValue })
		}) */

		// 브라우저 창 크기 변경시 이벤트 발생

		$(window).resize(function() {

			var browserWidth = window.outerWidth

			if (browserWidth <= 720) {
				$container.isotope({ sortBy: 'category' })
			} else if (browserWidth <= 960) {
				$container.isotope({ sortBy: '' })
			} else if (browserWidth <= 1199) {
				$container.isotope({ sortBy: '' })
			} else {
				$container.isotope({ sortBy: '' })
			}

		})

	}

	// tab (main)

	function tab() {

		if (!$('body').hasClass('home')) { return }

		$('.no_01').on('click', function() {

			$('.no_02').removeClass('active')
			$('.no_01').addClass('active')
			
			$('.no_02_cont').css('display', 'none')
			$('.no_01_cont').css('display', 'block')

			/* $('.box_02 .more').prop('href', 'notice_list.html') */

		})

		$('.no_02').on('click', function() {

			$('.no_01').removeClass('active')
			$('.no_02').addClass('active')

			$('.no_01_cont').css('display', 'none')
			$('.no_02_cont').css('display', 'block')

			/* $('.box_02 .more').prop('href', 'news_list.html') */

		})

	}

	// top floating

	function scrollFlag() {

		var btnTopFlag = false

		$(window).scroll( function() {

			if ($(window).scrollTop() > 100) {

				if (!btnTopFlag) {
					$('#btn_top').stop(true).fadeIn(300)
				}

				btnTopFlag = true
				
			} else {

				if (btnTopFlag) {
					$('#btn_top').stop(true).fadeOut(300)
				}
					
				btnTopFlag = false

			}

		})

	}

	// popup

	function popup() {

		if (!$('body').hasClass('home')) { return }

		$('.pop_wrap a').on('click', function() {
			$('.pop_layer').css('display', 'none')
		})

	}

	// capty

	function capty() {

		if (!$('body').hasClass('page_gallery')) { return }

		if ($('body').data('device') != 'mobile') {

			$('.img_list ul li img').capty({
				height: 70,
				speed: 400
			})

		}

	}

	// faq

	function faq() {

		$('.faqList dl dt a').on('click', function() {

			if ($(this).parent().next().css('display') == 'none') {

				$('.faqList dl dt a').removeClass('on')
				$('.faqList dl dd').slideUp(150)
				$(this).addClass('on')
				$(this).parent().next().slideDown(150)

			} else {

				$('.faqList dl dt a').removeClass('on')
				$('.faqList dl dd').slideUp(150)

			}

		})

	}

})


// device chk

$.fn.device = function() {

	var size = $(window).width() + 17 // 스크롤바 width 추가
		
	if (size <= 1200) {
		$('body').data('device', 'mobile')
	/* } else if(size > 1024 && size < 1280) {
		$('body').data('device', 'tablet') */
	} else {
		$('body').data('device', 'pc')
	}

}

// gnb setting

$.fn.gnbSize = function() {

	var deviceWidth = $(window).width()
	var deviceHeight = $(window).height()
	
	if ($('body').data('device') == 'mobile') {

		$('body').css('overflow', 'visible')
		$('#gnb > .box').css({
			'height': deviceHeight,
			'background': '#fff'
		})

		$('#gnb .sub_menu').show()
		$('#gnb .sub_menu ul').hide()
		if ($('#gnb > .dim').length == 0) {
			$('#gnb').append("<div class='dim' style='display:none;position:absolute;top:-30px;left:0px;z-index:10;width:" + (deviceWidth + 17) + "px;height:" + deviceHeight + "px;background:#000;filter:alpha(opacity=50);opacity:0.5'></div>")
		}

	} else {

		$('body').css('overflow', 'visible')
		$('#header .h_group > div > h1 > a > img').css('display', 'block')

		$('#gnb > div.box').css({
			'display': 'block',
			'height': 'auto',
			'background': 'none'
		})

		$('#gnb > div.box').css('right', '-80%')
		$('#gnb > div.box > ul > li').removeClass('current')
		$('#gnb .sub_menu').hide()
		$('#gnb .sub_menu ul').show()
		$('#gnb .sub_menu > div > ul').show()
		$('#gnb > .dim').remove()

	}

}

// scroll top 

function scollTopStart() {

	 $('html,body').stop().animate({ scrollTop: 0 }, 600)

}