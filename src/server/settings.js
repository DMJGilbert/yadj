ServiceConfiguration.configurations.remove({
    service: 'rdio'
});
ServiceConfiguration.configurations.insert({
    service: 'rdio',
    secret: Meteor.settings.rdio.consumerSecret,
    consumerKey: Meteor.settings.rdio.consumerKey
});
