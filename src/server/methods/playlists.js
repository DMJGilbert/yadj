Meteor.methods({
	findArtists: function (search) {
		check(search, String);

		var user = Meteor.user();
		if (!user) return "No user";

		var rdio = Rdio.forUser(user);
		if (!rdio) return "No Rdio creadentials";
		return rdio.call('search', {
			query: search,
			types: 'Artist'
		});
	}
});
