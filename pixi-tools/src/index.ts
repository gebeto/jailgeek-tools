import WebFont from 'webfontloader';
import post from './post';

WebFont.load({
	active: function() {
		console.log('Fonts loaded')
		post();
	},
	fontactive: function(familyName, fvd) {
		console.log(familyName, fvd)
	},
	custom: {
		families: ['SF Display Heavy'],
		urls: ['fonts/fonts.css'],
	}
});
