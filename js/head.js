(function () {
	let str = '';
	str += '<link rel="stylesheet" href="../css/font/font.css" />';
	str += '<link rel="stylesheet" href="../css/lib/swiper-bundle.min.css" />';
	str += '<link rel="stylesheet" href="../css/lib/animate.min.css" />';
	str += '<link rel="stylesheet" href="../css/style.css" />';
	str += '<script type="text/javascript" src="../js/lib/jquery.min.js"></script>';
	str += '<script type="text/javascript" src="../js/lib/jquery-ui.min.js"></script>';
	str += '<script type="text/javascript" src="../js/lib/jquery.lettering.js"></script>';
	str += '<script type="text/javascript" src="../js/lib/swiper-bundle.min.js"></script>';
	str += '<script type="text/javascript" src="../js/lib/jquery.textillate.js"></script>';
	str += '<script type="text/javascript" src="../js/lib/raindrops.js"></script>';
	str += '<script type="text/javascript" src="../js/common.js"></script>';
	document.write(str);
	const $include = document.querySelector('.__include');
	if ($include) $include.remove();
})();
