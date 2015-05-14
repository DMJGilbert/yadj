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
	'submit #host': function (event, template) {
		var fallback = Session.get('selectedArtist').radioKey;
		var name = template.find('#name').value;
		var password = template.find('#password').value;
		Parties.insert({
			name: name,
			password: password,
			fallback: fallback
		}, function (er, _id) {
			if (_id) {
				Router.go('/party/' + _id);
			}
		});
		event.preventDefault();
		return false;
	},

	'keydown #playlistSearch': function (event, template) {
		var search = template.find('#playlistSearch').value;
		if (window.searchTimeout) {
			clearTimeout(window.searchTimeout);
		}
		if (event.keyCode == 13) {
			event.preventDefault();
			lookupArtists(search)
		}
	},

	'keyup #playlistSearch': function (event, template) {
		var search = template.find('#playlistSearch').value;
		if (window.searchTimeout) {
			clearTimeout(window.searchTimeout);
			delete window.searchTimeout;
		}
		if (search.length > 2) {
			window.searchTimeout = setTimeout(function () {
				lookupArtists(search)
			}, 600);
		} else {
			Session.set('artists', undefined);
		}
	},

	'click li.collection-item.interactive': function (event, template) {
		var id = $(event.currentTarget).attr('id');
		Session.get('artists').forEach(function (artist) {
			if (artist.key == id) {
				Session.set('selectedArtist', artist);
			}
		});
	}
};

Template.host.helpers({
	artists: function () {
		return Session.get('artists');
	},
	image: function (image) {
		return image.split('%')[0];
	},
	isActive: function (key) {
		if (Session.get('selectedArtist') && Session.get('selectedArtist').key == key) {
			return 'selected';
		}
	}
});

function lookupArtists(search) {
	Meteor.call('findArtists', search, function (error, data) {
		if (error) {
			console.error(error);
		}
		console.log(data.results);
		Session.set('artists', data.results)
	});
}
