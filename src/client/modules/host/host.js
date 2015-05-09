/**
 * @file
 * Defines '/host' route.
 */
/* globals Router, Meteor */

Router.route('/host', {
	// Render the 'host' template.
	action: function () {
		this.render('host', {
			// Pass example documents into the template.
			data: function () {
				return {};
			}
		});
	}
});


Template.host.events = {
	'keyup #playlistSearch': function (event, template) {
		var search = template.find('#playlistSearch').value;
		if (search.length > 2) {
			if (window.searchTimeout) {
				clearTimeout(window.searchTimeout);
			}
			window.searchTimeout = setTimeout(function () {
				Meteor.call('findArtists', search, function (error, result) {
					if(error){
						console.error(error);						
					}
					console.log(result);
					Session.set('artists', {})
				});
			}, 500);
		} else {
			if (window.searchTimeout) {
				clearTimeout(window.searchTimeout);
			}
			Session.set('playlists', undefined);
		}
	}
};

Template.host.helpers({
	artists: function () {
		return Session.get('artists');
	},
	image: function (images) {
		return images[images.length - 1].url;
	}
});
//playlistSearch