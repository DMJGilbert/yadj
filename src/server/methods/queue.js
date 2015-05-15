Meteor.methods({
	addToQueue: function (request) {
		check(request.partyId, String);
		if (request.partyId) {
			var party = Parties.findOne(request.partyId);
			if (party) {
				Parties.update(party._id, {
					$push: {
						queue: request.song
					}
				});
				return 'success';
			}
		}
	}
});
