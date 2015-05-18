/**
 * @file
 * Defines 'Parties' collections and helpers.
 */
/* globals Parties:true, Mongo */

// Declare 'Parties' collection.
Parties = new Mongo.Collection('parties');

Parties.helpers({});

var SongSchema = new SimpleSchema({
	album: {
		type: String,
		max: 100
	},
	artist: {
		type: String,
		max: 100
	},
	name: {
		type: String,
		max: 100
	},
	key: {
		type: String,
		max: 100
	},
	icon400: {
		type: String,
		max: 250
	}
});


Parties.attachSchema({
	name: {
		type: String,
		max: 200
	},
	password: {
		type: String,
		max: 200
	},
	fallback: {
		type: String,
		max: 50
	},
	status: {
		type: Number,
	},
	users: {
		type: [String],
		optional: true
	},
	current: {
		type: SongSchema,
		optional: true
	},
	backup: {
		type: [SongSchema],
		optional: true
	},
	queue: {
		type: [SongSchema],
		optional: true
	}
});

Parties.before.insert(function (userId, doc) {
	doc.createdAt = new Date();
	doc.host = userId;
	doc.status = 0;
	doc.users = [];
	doc.users.push(userId);
});
