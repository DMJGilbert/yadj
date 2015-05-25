Meteor.methods({
	getPlaybackToken: function (domain) {
		check(domain, String);

		var user = Meteor.user();
		if (!user) return "No user";

		var rdio = Rdio.forUser(user);
		if (!rdio) return "No Rdio creadentials";
		return rdio.call('getPlaybackToken', {domain: domain});
	}
});
