Meteor.methods({
	addToQueue: function (request) {
		check(request.partyId, String);
		if (request.partyId) {
			var party = Parties.findOne(request.partyId);
			var position = getPositionQueue(party, Meteor.user());
			if (party) {
				var song = request.song;
				song.dj = {
					_id: Meteor.user()._id,
					name: Meteor.user().profile.name,
					time: new Date()
				};
				Parties.update(party._id, {
					$push: {
						queue: {
							$each: [song],
							$position: position
						}
					}
				});
				return 'success';
			}
		}
	}
});

function getPositionQueue(party, user) {
	var users = [{
		_id: user._id,
		requests: 0,
		indexes: []
	}];

	if (party && party.queue && party.queue.length) {
		for (var i = 0; i < party.queue.length; i++) {
			var song = party.queue[i];
			if (song && song.dj) {
				if (users.length) {
					var added = false
					for (var j = 0; j < users.length; j++) {
						if (users[j]._id == song.dj._id) {
							users[j].requests++;
							users[j].indexes.push(i);
							added = true;
						}
					}
					if (!added) {
						users.push({
							_id: song.dj._id,
							requests: 0,
							indexes: [i]
						});
					}
				} else {
					users.push({
						_id: song.dj._id,
						requests: 0,
						indexes: [i]
					});
				}
			}
		}
		var requestNumber = users[0].requests;
		var lastIndex = 1;
		if (users[0].indexes.length) {
			lastIndex = users[0].indexes[users[0].indexes.length - 1] + 1;
		}
		for (var i = 1; i < users.length; i++) {
			var checkIndex = Math.min(requestNumber, users[i].indexes.length - 1);
			if (users[i].indexes[checkIndex] >= lastIndex) {
				lastIndex = users[i].indexes[checkIndex] + 1;
			}
		}

		return lastIndex;
	}

	return 0;
}
