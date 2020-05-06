function snb(cate, snb, chk) {

	var uniq = {

		'crops'     : '만세보령 농식품 직판장',
		'local'     : '특산품 안내',
		'notify'    : '알림마당',
		'news'      : '열린마당',

	};

	str = ''		
	str += '<div class="snb_list">'
	str += '	<h2 class="snb_tit"><span>' + uniq[cate] + '</span></h2>';
	str += '	<ul class="snb_nav">';

	if ( cate == 'crops' ) {

		str += '	<li><a href="greeting.html">인사말</a></li>';
		str += '	<li><a href="intro.html">농식품 직판장 소개</a></li>';
		str += '	<li><a href="contact.html">오시는길</a></li>';

	}

	if ( cate == 'local' ) {

		str += '	<li><a href="majorbiz.html">주요사업</a></li>';
		str += '	<li><a href="product.html">제품소개</a></li>';

	}
	
	if ( cate == 'notify' ) {

		str += '	<li><a href="news_list.html">농가소식</a></li>';
		str += '	<li><a href="notice_list.html">공지사항</a></li>';	
		str += '	<li><a href="guide.html">시설안내</a></li>';
		str += '	<li><a href="photo_list.html">포토 갤러리</a></li>';	

	}

	if ( cate == 'news' ) {

		str += '	<li><a href="tour.html">주변 관광지</a></li>';
		str += '	<li><a href="faq.html">자주하는 질문</a></li>';
		str += '	<li><a href="inquery.html">1:1 문의하기</a></li>';

	}

	str += '	</ul>';
	str += '</div>';

	document.getElementById(snb).innerHTML += str;

	$('.snb_nav li:nth-child(' + chk + ')').addClass('on');

}