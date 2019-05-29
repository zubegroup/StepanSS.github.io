
$(document).ready(function() {
	$('.popup-gallery').magnificPopup({
		delegate: 'a',
//		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
//			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>Select</small>';
			}
		}
	});
});
$(document).ready(function() {
	$('.form-group').magnificPopup({
		delegate: 'a',
//		type: 'img',
//		tLoading: 'Loading image #%curr%...',
//		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
//			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>Select</small>';
			}
		}
	});
});

// From an element with ID #popup
//$('.form-group').magnificPopup({
//  items: {
//      src: '.form-check',
//      type: 'inline'
//  }
//});

//$('.open-popup-link').magnificPopup({
//  type:'inline',
//  midClick: true // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
//});