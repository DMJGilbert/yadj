/**
 * @file
 * Contains global configurations.
 */
/* globals Router */
Router.configure({
	layoutTemplate: 'layoutMain',
	//	loadingTemplate: 'loading'
});

Router.onBeforeAction(function () {
	if (Meteor.userId()) {
		this.render('home');
	} else {
		this.next();
	}
}, {
	only: ['login', 'register']
});

Router.onBeforeAction(function () {
	if (!Meteor.userId()) {
		this.render('home');
	} else {
		this.next();
	}
}, {
	only: ['host', 'join', 'party']
});
