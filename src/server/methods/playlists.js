Meteor.methods({
	findArtists: function (search) {
		check(search, String);
		var consumer = [Meteor.settings.rdio.consumerKey, Meteor.settings.rdio.consumerSecret];
		var access = [Meteor.settings.rdio.accessToken, Meteor.settings.rdio.accessSecret];
		var params = {
			query: search,
			types: 'Artist',
			method: 'search'
		};

		var auth = Meteor.rdioOAuth(consumer, 'http://api.rdio.com/1/', params, access);

		return Meteor.http.post('http://api.rdio.com/1/', {
			headers: {
				'Authorization': auth,
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Origin': '*'
			},
			params: params
		});
	}
});
