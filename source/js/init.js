/* globals Bloodhound */
(function(global, $){
    'use strict';


	//Navigation toggle
	$('.nav-toggle-menu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
	});

	//Navigation toggle
	$('.nav-toggle-search').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.header .search-form').toggleClass('active');
	});

	/* typeahead bootstrap */
	var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
		'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
		'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
		'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
		'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
		'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
		'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
		'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
		'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	];

	var countries = [
		{name: 'Afghanistan', code: 'af'},
		{name: 'Åland Islands', code: 'ax'},
		{name: 'Albania', code: 'al'},
		{name: 'Algeria', code: 'dz'},
		{name: 'American Samoa', code: 'as'},
		{name: 'Andorra', code: 'ad'},
		{name: 'Angola', code: 'ao'},
		{name: 'Anguilla', code: 'ai'},
		{name: 'Antarctica', code: 'aq'},
		{name: 'Antigua and Barbuda', code: 'ag'},
		{name: 'Argentina', code: 'ar'},
		{name: 'Armenia', code: 'am'},
		{name: 'Aruba', code: 'aw'},
		{name: 'Australia', code: 'au'},
		{name: 'Austria', code: 'at'},
		{name: 'Azerbaijan', code: 'az'},
		{name: 'Bahamas', code: 'bs'},
		{name: 'Bahrain', code: 'bh'},
		{name: 'Bangladesh', code: 'bd'},
		{name: 'Barbados', code: 'bb'},
		{name: 'Belarus', code: 'by'},
		{name: 'Belgium', code: 'be'},
		{name: 'Belize', code: 'bz'},
		{name: 'Benin', code: 'bj'},
		{name: 'Bermuda', code: 'bm'},
		{name: 'Bhutan', code: 'bt'},
		{name: 'Bolivia', code: 'bo'},
		{name: 'Bosnia and Herzegovina', code: 'ba'},
		{name: 'Botswana', code: 'bw'},
		{name: 'Brazil', code: 'br'},
		{name: 'Brunei Darussalam', code: 'bn'},
		{name: 'Bulgaria', code: 'bg'},
		{name: 'Burkina Faso', code: 'bf'},
		{name: 'Burundi', code: 'bi'},
		{name: 'Cambodia', code: 'kh'},
		{name: 'Cameroon', code: 'cm'},
		{name: 'Canada', code: 'ca'},
		{name: 'Cape Verde', code: 'cv'},
		{name: 'Cayman Islands', code: 'ky'},
		{name: 'Central African Republic', code: 'cf'},
		{name: 'Chad', code: 'td'},
		{name: 'Chile', code: 'cl'},
		{name: 'China', code: 'cn'},
		{name: 'Colombia', code: 'co'},
		{name: 'Comoros', code: 'km'},
		{name: 'Congo', code: 'cg'},
		{name: 'Congo, The Democratic Republic of the', code: 'cd'},
		{name: 'Cook Islands', code: 'ck'},
		{name: 'Costa Rica', code: 'cr'},
		{name: 'Cote D\'Ivoire', code: 'ci'},
		{name: 'Croatia', code: 'hr'},
		{name: 'Cuba', code: 'cu'},
		{name: 'Cyprus', code: 'cy'},
		{name: 'Czech Republic', code: 'cz'},
		{name: 'Denmark', code: 'dk'},
		{name: 'Djibouti', code: 'dj'},
		{name: 'Dominica', code: 'dm'},
		{name: 'Dominican Republic', code: 'do'},
		{name: 'Ecuador', code: 'ec'},
		{name: 'Egypt', code: 'eg'},
		{name: 'El Salvador', code: 'sv'},
		{name: 'Equatorial Guinea', code: 'gq'},
		{name: 'Eritrea', code: 'er'},
		{name: 'Estonia', code: 'ee'},
		{name: 'Ethiopia', code: 'et'},
		{name: 'Faroe Islands', code: 'fo'},
		{name: 'Fiji', code: 'fj'},
		{name: 'Finland', code: 'fi'},
		{name: 'France', code: 'fr'},
		{name: 'French Polynesia', code: 'pf'},
		{name: 'Gabon', code: 'ga'},
		{name: 'Gambia', code: 'gm'},
		{name: 'Georgia', code: 'ge'},
		{name: 'Germany', code: 'de'},
		{name: 'Ghana', code: 'gh'},
		{name: 'Gibraltar', code: 'gi'},
		{name: 'Greece', code: 'gr'},
		{name: 'Greenland', code: 'gl'},
		{name: 'Grenada', code: 'gd'},
		{name: 'Guadeloupe', code: 'gp'},
		{name: 'Guam', code: 'gu'},
		{name: 'Guatemala', code: 'gt'},
		{name: 'Guernsey', code: 'gg'},
		{name: 'Guinea', code: 'gn'},
		{name: 'Guinea-Bissau', code: 'gw'},
		{name: 'Guyana', code: 'gy'},
		{name: 'Haiti', code: 'ht'},
		{name: 'Holy See (Vatican City State)', code: 'va'},
		{name: 'Honduras', code: 'hn'},
		{name: 'Hong Kong', code: 'hk'},
		{name: 'Hungary', code: 'hu'},
		{name: 'Iceland', code: 'is'},
		{name: 'India', code: 'in'},
		{name: 'Indonesia', code: 'id'},
		{name: 'Iran, Islamic Republic Of', code: 'ir'},
		{name: 'Iraq', code: 'iq'},
		{name: 'Ireland', code: 'ie'},
		{name: 'Isle of Man', code: 'im'},
		{name: 'Israel', code: 'il'},
		{name: 'Italy', code: 'it'},
		{name: 'Jamaica', code: 'jm'},
		{name: 'Japan', code: 'jp'},
		{name: 'Jersey', code: 'je'},
		{name: 'Jordan', code: 'jo'},
		{name: 'Kazakhstan', code: 'kz'},
		{name: 'Kenya', code: 'ke'},
		{name: 'Kiribati', code: 'ki'},
		{name: 'Korea, Democratic People\'S Republic of', code: 'kp'},
		{name: 'Korea, Republic of', code: 'kr'},
		{name: 'Kuwait', code: 'kw'},
		{name: 'Kyrgyzstan', code: 'kg'},
		{name: 'Lao People\'S Democratic Republic', code: 'la'},
		{name: 'Latvia', code: 'lv'},
		{name: 'Lebanon', code: 'lb'},
		{name: 'Lesotho', code: 'ls'},
		{name: 'Liberia', code: 'lr'},
		{name: 'Libyan Arab Jamahiriya', code: 'ly'},
		{name: 'Liechtenstein', code: 'li'},
		{name: 'Lithuania', code: 'lt'},
		{name: 'Luxembourg', code: 'lu'},
		{name: 'Macao', code: 'mo'},
		{name: 'Macedonia, The Former Yugoslav Republic of', code: 'mk'},
		{name: 'Madagascar', code: 'mg'},
		{name: 'Malawi', code: 'mw'},
		{name: 'Malaysia', code: 'my'},
		{name: 'Maldives', code: 'mv'},
		{name: 'Mali', code: 'ml'},
		{name: 'Malta', code: 'mt'},
		{name: 'Marshall Islands', code: 'mh'},
		{name: 'Martinique', code: 'mq'},
		{name: 'Mauritania', code: 'mr'},
		{name: 'Mauritius', code: 'mu'},
		{name: 'Mayotte', code: 'yt'},
		{name: 'Mexico', code: 'mx'},
		{name: 'Micronesia, Federated States of', code: 'fm'},
		{name: 'Moldova, Republic of', code: 'md'},
		{name: 'Monaco', code: 'mc'},
		{name: 'Mongolia', code: 'mn'},
		{name: 'Montserrat', code: 'ms'},
		{name: 'Morocco', code: 'ma'},
		{name: 'Mozambique', code: 'mz'},
		{name: 'Myanmar', code: 'mm'},
		{name: 'Namibia', code: 'na'},
		{name: 'Nauru', code: 'nr'},
		{name: 'Nepal', code: 'np'},
		{name: 'Netherlands', code: 'nl'},
		{name: 'New Caledonia', code: 'nc'},
		{name: 'New Zealand', code: 'nz'},
		{name: 'Nicaragua', code: 'ni'},
		{name: 'Niger', code: 'ne'},
		{name: 'Nigeria', code: 'ng'},
		{name: 'Niue', code: 'nu'},
		{name: 'Norfolk Island', code: 'nf'},
		{name: 'Northern Mariana Islands', code: 'mp'},
		{name: 'Norway', code: 'no'},
		{name: 'Oman', code: 'om'},
		{name: 'Pakistan', code: 'pk'},
		{name: 'Palau', code: 'pw'},
		{name: 'Palestinian Territory, Occupied', code: 'ps'},
		{name: 'Panama', code: 'pa'},
		{name: 'Papua New Guinea', code: 'pg'},
		{name: 'Paraguay', code: 'py'},
		{name: 'Peru', code: 'pe'},
		{name: 'Philippines', code: 'ph'},
		{name: 'Pitcairn', code: 'pn'},
		{name: 'Poland', code: 'pl'},
		{name: 'Portugal', code: 'pt'},
		{name: 'Puerto Rico', code: 'pr'},
		{name: 'Qatar', code: 'qa'},
		{name: 'Reunion', code: 're'},
		{name: 'Romania', code: 'ro'},
		{name: 'Russian Federation', code: 'ru'},
		{name: 'Rwanda', code: 'rw'},
		{name: 'Saint Kitts and Nevis', code: 'kn'},
		{name: 'Saint Lucia', code: 'lc'},
		{name: 'Saint Pierre and Miquelon', code: 'pm'},
		{name: 'Saint Vincent and the Grenadines', code: 'vc'},
		{name: 'Samoa', code: 'ws'},
		{name: 'San Marino', code: 'sm'},
		{name: 'Sao Tome and Principe', code: 'st'},
		{name: 'Saudi Arabia', code: 'sa'},
		{name: 'Senegal', code: 'sn'},
		{name: 'Serbia and Montenegro', code: 'cs'},
		{name: 'Seychelles', code: 'sc'},
		{name: 'Sierra Leone', code: 'sl'},
		{name: 'Singapore', code: 'sg'},
		{name: 'Slovakia', code: 'sk'},
		{name: 'Slovenia', code: 'si'},
		{name: 'Solomon Islands', code: 'sb'},
		{name: 'Somalia', code: 'so'},
		{name: 'South Africa', code: 'za'},
		{name: 'South Georgia and the South Sandwich Islands', code: 'gs'},
		{name: 'Spain', code: 'es'},
		{name: 'Sri Lanka', code: 'lk'},
		{name: 'Sudan', code: 'sd'},
		{name: 'Suriname', code: 'sr'},
		{name: 'Svalbard and Jan Mayen', code: 'sj'},
		{name: 'Swaziland', code: 'sz'},
		{name: 'Sweden', code: 'se'},
		{name: 'Switzerland', code: 'ch'},
		{name: 'Syrian Arab Republic', code: 'sy'},
		{name: 'Taiwan, Province of China', code: 'tw'},
		{name: 'Tajikistan', code: 'tj'},
		{name: 'Tanzania, United Republic of', code: 'tz'},
		{name: 'Thailand', code: 'th'},
		{name: 'Timor-Leste', code: 'tl'},
		{name: 'Togo', code: 'tg'},
		{name: 'Tokelau', code: 'tk'},
		{name: 'Tonga', code: 'to'},
		{name: 'Trinidad and Tobago', code: 'tt'},
		{name: 'Tunisia', code: 'tn'},
		{name: 'Turkey', code: 'tr'},
		{name: 'Turkmenistan', code: 'tm'},
		{name: 'Turks and Caicos Islands', code: 'tc'},
		{name: 'Tuvalu', code: 'tv'},
		{name: 'Uganda', code: 'ug'},
		{name: 'Ukraine', code: 'ua'},
		{name: 'United Arab Emirates', code: 'ae'},
		{name: 'United Kingdom', code: 'gb'},
		{name: 'United States', code: 'us'},
		{name: 'Uruguay', code: 'uy'},
		{name: 'Uzbekistan', code: 'uz'},
		{name: 'Vanuatu', code: 'vu'},
		{name: 'Venezuela', code: 've'},
		{name: 'Viet Nam', code: 'vn'},
		{name: 'Virgin Islands, British', code: 'vg'},
		{name: 'Virgin Islands, U.S.', code: 'vi'},
		{name: 'Western Sahara', code: 'eh'},
		{name: 'Yemen', code: 'ye'},
		{name: 'Zambia', code: 'zm'},
		{name: 'Zimbabwe', code: 'zw'}
	];

	var state_search = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: states
	});

	var country_search = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		local: countries
	});


    /**************
     *  1. Use Bloodhound instance for initial results.
     *  2. Sort Bloodhound results
     *      a. match those that have the query as the first part of their string
     *      b. alphabetically
     **************/


	var state_search2 = function(query, callback) {
		state_search.search(query, function(results) {
			results.sort(first_comp(query));
			callback(results);
		});
	};

	var country_search2 = function(query, callback) {
		country_search.search(query, function(results) {
			results.sort(first_comp(query, 'name'));
			callback(results);
		});
	};

	function first_comp(query, key) {
		var q = query.toLowerCase();
		return function(a,b) {
			if(key) {
				a = a[key];
				b = b[key];
			}
			var a_str = a.toLowerCase();
			var b_str = b.toLowerCase();

			var a_index = a_str.indexOf(q);
			var b_index = b_str.indexOf(q);

			if(a_index === 0) {
				if(b_index === 0) {
					return alpha_comp(a_str, b_str);
				}
				return -1;
			}
			if(b_index === 0) {
				return 1;
			}
			return alpha_comp(a_str, b_str);
		};
	}

	function alpha_comp(a, b) {
		return a < b ? -1 : 1;
	}

	var $slickCarousel = $('.loan-figure-carousel');
	$slickCarousel.on('init', function(slick) {
		var loanFigure = $('.loan-figure');

		var $images = loanFigure.find('.loan-image-wrap');
		var $slickList = loanFigure.find('.slick-list');
		$slickList.css('height', 'auto');
		$images.css('transition', 'opacity 2s ease-in-out');
		$images.css('position', 'relative');
		$images.css('opacity', 1);
	}).slick({
		mobileFirst: true
		, prevArrow: '.carousel-prev'
		, nextArrow: '.carousel-next'
		, adaptiveHeight: true,
		lazyLoad: 'ondemand',
		speed: 1000
	});

	var $loanMessage = $('.loan-message');
	var $loanImageFooter = $('.loan-image-footer');
	$loanImageFooter.css('position', 'relative');
	$loanImageFooter.css('transition', 'margin 0.3s ease-in-out');

	$slickCarousel.on('beforeChange', function () {
		$('.loan-message').css('visibility', 'hidden');
	});

	$slickCarousel.on('afterChange', function (event, slick, currentSlide) {
		var margin = $('.slick-active').find('.loan-image').css('margin-right');
		$loanMessage.css('right', margin);
		$loanMessage.css('visibility', 'visible');
		$loanImageFooter.css('margin-right', margin);
		$loanImageFooter.css('margin-left', margin);
	});

	function loadSvgIcons() {
		return $.get('/images/icons.svg', function(data) {
			var div = document.createElement('div');
			div.innerHTML = new XMLSerializer().serializeToString(data.documentElement);
			document.body.insertBefore(div, document.body.childNodes[0]);
		});
	}

	$('#search-box').typeahead({
			highlight: true,
			classNames: {
				menu: 'top-nav-search-menu'
			}
		},
		{
			name: 'keyword',
			source: function(query, results) {
				results([query]);
			},
			templates: {
				header: 'Keyword'
			}
		},
		{
			name: 'countries',
			source: country_search2,
			display: 'name',
			templates: {
				header: 'Countries',
				suggestion: function(suggestion) {
					return '<div><span class="f16 ' + suggestion.code + '"></span> ' + suggestion.name + '</div>';
				}
			}
		},
		{
			name: 'states',
			source: state_search2,
			templates: {
				header: 'States'
			}
		}
	);

	var $typeahead_menu = $('.top-nav-search-menu').detach();
	$('.top-nav').append($typeahead_menu);

	$(document).foundation({
		accordion: {
			// allow multiple accordion panels to be active at the same time
			multi_expand: true,
			// allow accordion panels to be closed by clicking on their headers
			// setting to false only closes accordion panels when another is opened
			toggleable: true
		}
	});

	loadSvgIcons();

})(this, jQuery);