Meteor.methods({
	getBackup: function (key) {
		check(key, String);

		var user = Meteor.user();
		if (!user) return "No user";

		var rdio = Rdio.forUser(user);
		if (!rdio) return "No Rdio creadentials";

		return rdio.call('generateStation', {
			station_key: key,
			count: 20
		});
	}
});
