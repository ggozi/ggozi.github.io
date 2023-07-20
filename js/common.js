$(function(){
	uiHtml.include();
	swiperTotal.init();
	uiEtc.init();
	scrollItem();
	sclMenu.init();
});

$(window).on('load',function(){
	sclMenu.gnb();
	sclMenu.gnbBtn();

	function floatMenu(){
		if($(window).scrollTop() > 10){
			$("#header").addClass("white");
		}else{
			$("#header").removeClass("white");
		}
	}

	$(window).scroll(function(){
		floatMenu();
	});
	
});


//Html include
const uiHtml = {
	include: function (fn) {
		const $elements = $.find('*[data-include-html]');
		if ($elements.length) {
			if (location.host) {
			$.each($elements, function (i) {
				const $this = $(this);
				$this.empty();
				const $html = $this.data('include-html');
				const $htmlAry = $html.split('/');
				const $htmlFile = $htmlAry[$htmlAry.length - 1];
				const $docTitle = document.title;
				let $title = null;
				if ($docTitle.indexOf(' | ') > -1) {
					$title = $docTitle.split(' | ')[0];
				}
				$this.load($html, function (sta) {
					if (sta == 'success') {
						if (!$this.attr('class') && !$this.attr('id')) $this.children().unwrap();
						else $this.removeAttr('data-include');
					}
					if (i === $elements.length - 1) {
						if (!!fn) fn();
					}
				});
			});
			} else {
				if (!!fn) fn();
			}
		}
	}
};

const sclMenu = {
	init : function(){
		//sclMenu.gnb();
		sclMenu.btnScl();
	},
	gnb : function(e){
		let $menu = $('#gnb li');
		$menu.each(function(){
			let $this = $(this);
			let $anchor = $this.find('>a');


			$anchor.on('click',function(e){
				e.preventDefault();
				let $this = $(this);
				let $headerH = $('#header').outerHeight();
				$('html, body').stop().animate({
					scrollTop: $($this.attr('href')).offset().top - $headerH
				}, 1000,'easeInOutExpo',function(){
					$this.attr('title','선택됨').parent('li').addClass('on').siblings().removeClass('on').find('>a').removeAttr('title');
	
				});
				
			})
		});
		$(window).scroll(function(){
			let $winH = $(window).height();
			let $winScl = $(window).scrollTop();
			let $menu = $('#gnb li');

			$menu.each(function(){
				let $this = $(this);
				let $anchor = $this.find('>a');
				let $anchorSclT = $($anchor.attr('href')).offset().top;
				let $anchorTop = $anchorSclT + $anchor.outerHeight(true);
				let $headerH = $('#header').outerHeight();
				let $sclBtm = $('#wrap').height() - $winH - $headerH;

				if($winScl >= $anchorTop - 135 && $winScl < $sclBtm){
					$this.addClass('on').siblings().removeClass('on');
				}

				if($winScl >= $sclBtm) {
					$(".gnb li").eq(3).removeClass('on');
					$(".gnb li").eq(4).addClass('on');
				}
			})


		})
	},
	btnScl : function(){
		$('.btn_scroll').on('click',function(){
			let $headerH = $('#header').outerHeight();
			let $workOffTop = $('#works').offset().top - $headerH;

			$('html, body').stop().animate({
				scrollTop: $workOffTop
			}, 400);
		})
	},
	gnbBtn : function(){
		$('#header .btn_nav').on('click', function(){
			
			$('#gnb').toggleClass('active');

			if($(this).hasClass('on')){
				$(this).removeClass('on').attr('title','메뉴열기');
			}else{
				$(this).addClass('on').attr('title','메뉴닫기');;
			}
		});
	}
}

const swiperTotal = {
	init: function() {
		swiperTotal.workSwiper();
	},
	workSwiper : function(e) {
		let swiperMain = document.querySelector('.work-swiper');

		const workSwiper = new Swiper(swiperMain, {
			slidesPerView: 1,
			grid: {
				rows: 1,
			},
			spaceBetween: 5,
			breakpoints: {
				901: {
				  slidesPerView: 3,
				  grid: {
					  rows: 2,
				  },
				  spaceBetween: 30,
				},
			},
			loop: false,
			a11y: false,
			autoplay: {
				delay: 5000,
			},
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
				renderBullet: function (index, className) {
					return '<button type="button" class="' + className + '">' + [index+1] + '번째 슬라이드</button>';
				},
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			on :{
				init:function(){
					$('.work-swiper .swiper-wrapper div').attr({'aria-hidden':'true','tabindex':-1});
					$('.work-swiper .swiper-wrapper div').eq(this.activeIndex).attr({'aria-hidden':'false','tabindex':0});
				},
				slideChange:function(e){
					$('.work-swiper .swiper-wrapper div').attr({'aria-hidden':'true','tabindex':-1});
					$('.work-swiper .swiper-wrapper div').eq(this.activeIndex).attr({'aria-hidden':'false','tabindex':0});
					let totalSlides = this.slides.length;
					let currentCount = (this.activeIndex)%(totalSlides)+1;
					if(currentCount === 0){
						$('.work-swiper .swiper-pagination button').removeAttr('title');
						$('.work-swiper .swiper-pagination button.swiper-pagination-bullet-active').attr({'title':totalSlides+'번째 배너 선택됨'});
					}else{
						$('.work-swiper .swiper-pagination button').removeAttr('title');
						$('.work-swiper .swiper-pagination button.swiper-pagination-bullet-active').attr({'title':'선택됨'});
					}
				}
			}
		})
		
		$('.swiper-play').on('click', function(e){
			workSwiper.autoplay.start();
			$(this).hide();
			$('.swiper-stop').show();
		})
		$('.swiper-stop').on('click', function(e){
			workSwiper.autoplay.stop();
			$(this).hide();
			$('.swiper-play').show();
		})

	}
}

const uiEtc = {
	init : function(){
		uiEtc.textRolling();
		uiEtc.rainDrop();
	},
	textRolling : function(e){
		$('.h2_tit').textillate({
			in: {
				effect: 'fadeInLeft',
				callback: function(){
					
				}
			}
		});

		let setTime = setTimeout(function(){
			$('.h3_tit').show().textillate({
				in: {
					effect: 'fadeInLeftBig'
				}
			});
			clearTimeout(setTime);
		},200)
	},
	rainDrop : function(e){
		$('#contact').raindrops({
			waveLength: 340,
			canvasWidth:2000,
			canvasHeight: 5,
			color:'#008381',
			frequency: 8,
			waveHeight: 80,
			density: 0.02,
			rippleSpeed: 0.1,
			rightPadding: 10,
			position:'absolute',
			positionBottom:0,
			positionLeft:0
		});
	}
}


const scrollItem = function(){
	let $elements = $.find('*[data-animation]'),
		$window = $(window);

	$(window).on('scroll resize',function(){
		$elements = $.find('*[data-animation]');
		if($elements.length > 0){
			checkInView();
		}
 	});

	function checkInView() {
		let $winHeight = $window.height(),
			$scrollTop = $window.scrollTop(),
			$winBottom = ($scrollTop + $winHeight);

		$.each($elements, function() {
			let $el = $(this),
				$elHeight = $($el).outerHeight(),
				$elTop = $($el).offset().top,
				//$elCenter = $elTop + ($elHeight/2),
				$elBottom = $elTop + $elHeight,
				$animationClass = $el.data('animation'),
				$delay = $el.data('delay'),
				$duration = $el.data('duration'),
				$gap = 200;


			if(!$el.hasClass('animated') && $animationClass != 'on'){
				if($delay > 0){
					$el.css({
						'-webkit-animation-delay':$delay+'ms',
						'animation-delay':$delay+'ms'
					});
				}
				if($duration > 0){
					$el.css({
						'-webkit-animation-duration':$duration+'ms',
						'animation-duration':$duration+'ms'
					});
				}

				$el.addClass('animated');
			}

			if ($elTop >= $scrollTop && $elBottom <= $winBottom) {
				$el.addClass($animationClass);
			}
		});
	}
};
