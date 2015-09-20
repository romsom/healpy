var challengeDefs = [
    {
	'name': "TakeAWalk",
	'requirements': {
	    'steps': 1000,
	},
	'dataElements': [],
	'finished': false,
	'check': function(dataElement, challenge) {
	    if(dataElement.type === 'steps') {
		challenge.requirements.steps -= dataElement.data;
		challenge.dataElements.push(dataElement);
	    }
	    if (challenge.requirements.steps <= 0) {
		challenge.finished = true;
	    }
	}
    }, {
	'name': "TakeAPicture",
	'requirements': {
	    'pictures': 1
	},
	'dataElements': [],
	'finished': false,
	'check': function (dataElement, challenge) {
	    if (dataElement.type === 'picture') {
		challenge.requirements.pictures--;
		challenge.dataElements.push(dataElement);
	    }
	    if (challenge.requirements.pictures <= 0) {
		challenge.finished = true;
	    }
	}
    }
];


Meteor.publish('challenges',function() {
    return challenges.find();
});

Meteor.methods({
    'newChallenge': function() {
    	var chNum = Math.floor(Math.random() * challengeDefs.length);
    	return challenges.insert({
    	    'id': chNum,
    	    'requirements': challengeDefs[chNum].requirements,
    	    'dataElements': [],
    	    'finished': false
    	});
    },
    'checkData': function(dataID) {
    	var activeChs = challenges.find({'finished': false}).fetch();
    	var data = dataElements.findOne(dataID);
    	var finished_challenges = [];
    	for (var ch in activeChs) {
    	    ch = activeChs[ch];
    	    challengeDefs[ch.id].check(data, ch);
    	    challenges.update(ch._id, ch);
    	    if (ch.finished) {
    		      finished_challenges.push(ch._id);
	       }
    	}
    	return finished_challenges;
    }
});
