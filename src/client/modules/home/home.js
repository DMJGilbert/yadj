/**
 * @file
 * Defines '/' route.
 */
/* globals Router, Meteor */

Router.route('/', {
	// Render the 'home' template.
	action: function () {
		this.render('home', {
			// Pass example documents into the template.
			data: function () {
				return {};
			}
		});
	}
});