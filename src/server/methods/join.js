Meteor.methods({
	joinParty: function (request) {
		check(request.partyId, String);
		check(request.password, String);

		if (request.partyId && request.password) {
			var party = Parties.find({
				_id: request.partyId,
				password: request.password
			});
			console.log(Meteor.userId())
			if (party) {
				Parties.update({
					_id: request.partyId,
					password: request.password
				}, {
					$push: {
						users: Meteor.userId()
					}
				});
				return 'success';
			}
		}
	}
});
