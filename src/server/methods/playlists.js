Meteor.methods({
	//	findPlaylists: function (search) {
	//		check(search, String);
	//		if (search.length > 2) {
	//			return Meteor.http.get('https://api.spotify.com/v1/search?q=' + search + '&type=playlist');
	//		} else {
	//			throw new Meteor.Error('query-too-short', 'Search query was too short');
	//		}
	//	}

	findArtists: function (search) {
		check(search, String);
		if (search.length > 2) {
			var auth = Meteor.rdioOAuth(Meteor.settings.rdio.consumerKey, 'http://api.rdio.com/1/', {
				query: search,
				types: 'Track',
				method: 'search',
			}, Meteor.settings.rdio.secret);
			return Meteor.http.post('http://api.rdio.com/1/', {
				headers: {
					'Authorization': auth,
					'Content-Type': 'application/x-www-form-urlencoded',
					'Access-Control-Allow-Origin': '*'
				}
			});
		} else {
			throw new Meteor.Error('query-too-short', 'Search query was too short');
		}
	}
});