ServiceConfiguration.configurations.remove({
    service: 'google'
});
ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: Meteor.settings.google.clientId,
    secret: Meteor.settings.google.secret
});

//ServiceConfiguration.configurations.remove({
//    service: 'rdio'
//});
//ServiceConfiguration.configurations.insert({
//    service: 'rdio',
//    secret: Meteor.settings.rdio.secret,
//    consumerKey: Meteor.settings.rdio.consumerKey
//});
