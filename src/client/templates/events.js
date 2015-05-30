Template.layoutMain.events = {
	'click a[data-link="logout"]': function (event) {
		Meteor.logout();
		Router.go('/');
	},
	'click a[data-link="rdio"]': function (event) {
		Meteor.loginWithRdio();
	}
}
