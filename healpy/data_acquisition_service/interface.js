/*
 * TODO generalize
availibleServices = ['oxford'];
preferredService = 'oxford';
*/
Meteor.methods({
    'getCV': function(file, features) {
	return getOxfordCV(file, features);
    },
    'getFullCV': function(file) {
	return getOxfordCV(file, 'All');
    }
});
    
