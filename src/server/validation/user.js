Accounts.validateNewUser(function (user) {
	// Ensure user name is long enough
	console.log(user);
	if(user.services.google){
		user.emails = [];
		user.emails.push({
			address: user.services.google.email	
		});
		user.username = user.services.google.name;
	}
	
	if (user.profile.name.length < 5) {
		throw new Meteor.Error(403, 'Your username needs at least 5 characters');
	}

	var passwordTest = /(?=.{6,}).*/g;
	if (!passwordTest.test(user.password)) {
		throw new Meteor.Error(403, 'Your password is too weak!');
	}

	var emailTest = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if (!emailTest.test(user.emails[0].address)) {
		throw new Meteor.Error(403, 'Invalid email!');
	}
	return true;
});