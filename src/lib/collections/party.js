/**
 * @file
 * Defines 'Parties' collections and helpers.
 */
/* globals Parties:true, Mongo */

// Declare 'Parties' collection.
Parties = new Mongo.Collection('parties');

Parties.helpers({});

Parties.attachSchema({
	name: {
		type: String,
		label: 'Title',
		max: 200
	},
	password: {
		type: String,
		label: 'Title',
		max: 200
	},
	fallback: {
		type: String,
		label: 'Title',
		max: 50
	},
	users: {
        type: [String]
    }
});

Parties.before.insert(function (userId, doc) {
	doc.createdAt = new Date();
	doc.host = userId;
	doc.status = 0;
	doc.users = [];
	doc.users.push(userId);
});
