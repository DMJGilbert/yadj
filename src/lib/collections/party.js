/**
 * @file
 * Defines 'Party' collections and helpers.
 */
/* globals Party:true, Mongo */

// Declare 'Party' collection.
Party = new Mongo.Collection('parties');

Party.helpers({
});

Party.before.insert(function (userId, doc) {
	doc.createdAt = new Date();
	doc.host = userId;
	doc.status = 0;
});