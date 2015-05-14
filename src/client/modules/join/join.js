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
	'click li.collection-item.interactive': function (event, template) {
		var id = $(event.currentTarget).attr('id');
		Router.go('/party/' + id);
	}
};

Template.join.helpers({
	randomColor: function () {
		var colors = ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange'];
		var num = Math.round(Math.random() * colors.length) - 1;
		return colors[num];
	}
});
