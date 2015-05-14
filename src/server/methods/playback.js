Meteor.methods({
	getPlaybackToken: function () {
		var user = Meteor.user();
		if (!user) return "No user";

		var rdio = Rdio.forUser(user);
		if (!rdio) return "No Rdio creadentials";
		return rdio.call('getPlaybackToken', {domain: 'localhost'});
	}
});
