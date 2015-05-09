/**
 * @file
 * Defines '/register' route.
 */
/* globals Router, Meteor, Template */

Router.route('/register', {
	// Render the 'register' template.
	action: function () {
		this.render('register', {
			data: function () {
				return {};
			}
		});
	}
});

Template.register.events = {
	'submit #register': function (event, template) {
		event.preventDefault();
		// retrieve the input field values
		var email = template.find('#email').value;
		var username = template.find('#username').value;
		var password = template.find('#password').value;			
		
		Accounts.createUser({
			email: email,
			username: username,
			password: password,
			profile: {
				name: username	
			}
		}, function (err) {
			if (err) {
				console.log(err)
				Materialize.toast(err.reason, 5000)
			} else {
				Router.go('/');
			}
		});
		return false;
	}
}