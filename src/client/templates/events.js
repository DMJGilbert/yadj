Template.layoutMain.events = {
	'click a[data-link="logout"]': function (event) {
		Meteor.logout();
	}
}