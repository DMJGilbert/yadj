/**
 * @file
 * Defines '/party' route.
 */
/* globals Router, Meteor */

Router.route('/party/:_id', {

	waitOn: function () {
		return Meteor.subscribe('parties');
	},
	// Render the 'party' template.
	action: function () {
		var params = this.params;
		var id = params._id;
		this.render('party', {
			// Pass example documents into the template.
			data: function () {
				return {
					party: function () {
						return Parties.find({
							_id: id
						});
					}
				};
			}
		});
	}
});


Template.party.events = {

};

Template.party.helpers({});
