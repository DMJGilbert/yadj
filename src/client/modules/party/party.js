/**
 * @file
 * Defines '/party' route.
 */
/* globals Router, Meteor */

var id;

window.rdioListener = {
	ready: function ready(user) {
		Session.set('rdioUser', user)
		window.rdioApi = $('#apiswf').get(0);
		playNextSong();
		window.lastAttempt = new Date();
	},
	playStateChanged: function (playState) {
		console.log('Status: ' + playState);
		if (playState) {
			Parties.update(id, {
				$set: {
					status: playState
				}
			});
		}
	},
	playingTrackChanged: function (playingTrack, sourcePosition) {

		if (!playingTrack) {
			var test = new Date();
			test.setSeconds(test.getSeconds() - 30);
			if (window.lastAttempt < test) {
				window.lastAttempt = new Date();
				playNextSong();
			}
		}

		if (playingTrack) {
			Parties.update(id, {
				$set: {
					current: playingTrack
				}
			});
		}
	},
	freeRemainingChanged: function (remaining) {
		console.log("Remaining: " + remaining)
	}
};

Router.route('/party/:_id', {
	waitOn: function () {
		return Meteor.subscribe('parties');
	},
	// Render the 'party' template.
	action: function () {
		var params = this.params;
		id = params._id;
		this.render('party', {
			// Pass example documents into the template.
			data: function () {
				return {
					party: function () {
						return Parties.findOne({
							_id: id
						});
					}
				};
			},
		});
	}
});

Template.party.rendered = function () {
	var party = Parties.findOne({
		_id: id
	});
	if(!party){
		Router.go('/join');
	}
	if (party && party.host == Meteor.userId()) {
		Meteor.call('getPlaybackToken', document.location.origin.replace('http://', '').replace('/', '').split(':')[0], function (error, data) {
			window.rdioApi = {};
			swfobject.embedSWF('http://www.rdio.com/api/swf/', 'apiswf', 1, 1, '9.0.0', 'expressInstall.swf', {
				'playbackToken': data,
				'domain': document.location.origin.replace('http://', '').replace('/', '').split(':')[0],
				'listener': 'rdioListener'
			}, {
				'allowScriptAccess': 'always'
			}, {});
		});
	}
}

Template.party.events = {
	'click button#delete': function (event, template) {
		Parties.remove(id);
		Router.go('/join');
	},
	'keydown #songSearch': function (event, template) {
		var search = template.find('#songSearch').value;
		if (window.searchTimeout) {
			clearTimeout(window.searchTimeout);
		}
		if (event.keyCode == 13) {
			event.preventDefault();
			lookupSongs(search)
		}
	},
	'keyup #songSearch': function (event, template) {
		var search = template.find('#songSearch').value;
		if (window.searchTimeout) {
			clearTimeout(window.searchTimeout);
			delete window.searchTimeout;
		}
		if (search.length > 2) {
			window.searchTimeout = setTimeout(function () {
				lookupSongs(search)
			}, 600);
		} else {
			Session.set('songs', undefined);
		}
	},
	'click li.collection-item.interactive': function (event, template) {
		var songId = $(event.currentTarget).attr('id');
		Session.get('songs').forEach(function (song) {
			if (song.key == songId) {
				queueSong(song, id)
			}
		});
	},
	'click a#pause': function (event, template) {
		var party = Parties.findOne({
			_id: id
		});
		if (party.status != 1) {
			rdioApi.rdio_play();

			Parties.update(id, {
				$set: {
					status: 1
				}
			});
		} else {
			rdioApi.rdio_pause();

			Parties.update(id, {
				$set: {
					status: 0
				}
			});
		}
	}
};

Template.party.helpers({
	stringify: function (obj) {
		return JSON.stringify(obj);
	},
	isNotSubscriber: function () {
		return Session.get('rdioUser') && !Session.get('rdioUser').isSubscriber;
	},
	songs: function () {
		return Session.get('songs');
	},
	image: function (image) {
		return image.split('%')[0];
	},
	shouldShow: function (test) {
		var party = Parties.findOne({
			_id: id
		});
		if (party &&  party.current && party.current.key == test.key) {
			return 'display: none';
		}
		if (party && party.queue && party.queue.length) {
			party.queue.forEach(function (song) {
				if (song.key == test.key) {
					return 'display: none';
				}
			})
		}
		return 'display: block';
	},
	isHost: function () {
		var party = Parties.findOne({
			_id: id
		});
		return party && party.host == Meteor.userId();
	},
	stateToIcon: function () {
		var party = Parties.findOne({
			_id: id
		});
		if (party && party.status == 1) {
			return 'mdi-av-pause';
		} else {
			return 'mdi-av-play-arrow';
		}
	}
});

function playNextSong() {
	var party = Parties.findOne({
		_id: id
	});
	console.log(party);
	if (party && party.queue && party.queue.length) {
		var tracks = party.queue;
		var current = party.queue[0];
		rdioApi.rdio_play(current.key);
		tracks.splice(0, 1);
		Parties.update(party._id, {
			$set: {
				current: current,
				queue: tracks
			}
		});
	} else {
		if (party.backup && party.backup.length) {
			console.log('Playing backup');
			var tracks = party.backup;
			var current = party.backup[0];
			tracks.splice(0, 1);
			console.log(current);
			rdioApi.rdio_play(current.key);
			Parties.update(party._id, {
				$set: {
					current: current,
					backup: tracks
				}
			});
		} else {
			console.log('Calling for backup');
			Meteor.call('getBackup', party.fallback, function (error, data) {
				var tracks = data.tracks;
				var current = tracks[0];
				tracks.splice(0, 1);
				rdioApi.rdio_play(current.key);
				console.log(current);
				Parties.update(party._id, {
					$set: {
						current: current,
						backup: tracks
					}
				});
			});
		}
	}
}

function lookupSongs(search) {
	Meteor.call('findSongs', search, function (error, data) {
		if (error) {
			console.error(error);
		}
		console.log(data.results);
		Session.set('songs', data.results)
	});
}

function queueSong(song, partyId) {
	Meteor.call('addToQueue', {
		partyId: partyId,
		song: song
	}, function (error, data) {
		if (data == 'success') {
			Materialize.toast('Added song to queue: ' + song.name + ' - ' + song.artist, 4000);
		}
	});
}
