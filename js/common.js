$(function(){
	uiHtml.include();
	swiperTotal.init();
	uiEtc.init();
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

const swiperTotal = {
	init: function() {
		swiperTotal.workSwiper();
	},
	workSwiper : function(e) {
		let swiperMain = document.querySelector('.work-swiper');

		new Swiper(swiperMain, {
			// grabCursor: true,
			// centeredSlides: true,
			slidesPerView: 1,
			loop: true,
			a11y: false,
			autoplay: {
				delay: 6000,
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
		})

	}
}

const uiEtc = {
	init : function(){
		uiEtc.textRolling();
		uiEtc.rainDrop();
	},
	textRolling : function(e){
		$('.tlt').textillate({
			in: {
				effect: 'fadeInLeft',
				callback: function(){
					$('.tlt2').show().textillate({
						in: {
							effect: 'fadeInLeftBig'
						}
					});
				}
			}
		});
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

