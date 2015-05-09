/**
 * @file
 * Defines '/login' route.
 */
/* globals Router, Meteor */

Router.route('/login', {
	// Render the 'login' template.
	action: function () {
		this.render('login', {
			// Pass example documents into the template.
			data: function () {
				return {};
			}
		});
	}
});

Template.login.events = {
	'submit #login': function (event, template) {
		event.preventDefault();
		// retrieve the input field values
		var email = template.find('#email').value;
		var password = template.find('#password').value;

		Meteor.loginWithPassword(email, password, function (err) {
			if (err) {
				Materialize.toast('Failed to login, please check credentials', 5000)
			} else {
				Router.go('home');
			}
		});
		return false;
	},
	'click a[data-link="google"]': function (event) {
		Meteor.loginWithGoogle();
	}
}