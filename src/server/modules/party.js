/**
 * @file
 * Define allow and publish functions for Parties collection.
 */
/* globals Meteor, Parties */

Meteor.startup(function () {
	Parties.allow({
		insert: function (userId, party) {
			return userId;
		},
		update: function (userId, party) {
			return party.host == userId;
		},
		remove: function (userId, party) {
			return party.host == userId;
		}
	});
});

Meteor.publish('parties', function () {
	if (this.userId) {
		return Parties.find({
			'users': this.userId
		});
	} else {
		return {};
	}
});
