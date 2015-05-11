/**
 * @file
 * Defines '/join' route.
 */
/* globals Router, Meteor */

Router.route('/join', {
	// Wait until subscription has been created and the client has data.
	waitOn: function () {
		return Meteor.subscribe('parties');
	},
	// Render the 'join' template.
	action: function () {
		this.render('join', {
			// Pass example documents into the template.
			data: function () {
				return {
					parties: function () {
						return Parties.find();
					}
				};
			}
		});
	}
});


Template.join.events = {

};

Template.join.helpers({

});
