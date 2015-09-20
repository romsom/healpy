var challengeDefs = [
  //   {
	// 'name': "TakeAWalk",
	// 'requirements': {
	//     'steps': 1000,
	// },
	// 'dataElements': [],
	// 'finished': false,
	// 'check': function(dataElement, challenge) {
	//     if(dataElement.type == 'steps') {
	// 	challenge.requirements.steps -= dataElement.data;
	// 	challenge.dataElements.push(dataElement);
	//     }
	//     if (challenge.requirements.steps <= 0) {
	// 	challenge.finished = true;
	//     }
	//     // TODO event?
	// }
  //   }, {
	// 'name': "TakeAPicture",
	// 'requirements': {
	//     'pictures': 1
	// },
	// 'dataElements': [],
	// 'finished': false,
	// 'check': function (dataElement, challenge) {
	//     if (dataElement.type === 'image') {
	// 	      challenge.requirements.pictures--;
	// 	      challenge.dataElements.push(dataElement);
	//     }
	//     if (challenge.requirements.pictures <= 0) {
	// 	      challenge.finished = true;
	//     }
  //   }
  // },
  {
  	'title': "Take a picture of you",
    'description': "Save your brightest smile, like a treasure. Just take a quick photo. Healpy will recognize automatically when you show us all of your teeth. Only then will this mission be accomplished.",
  	'requirements': {
  	    'pictures': 1
  	},
  	'dataElements': [],
  	'finished': false,
  	'check': function (dataElement, challenge) {
        console.log("checking challenge");
  	    if (dataElement.type === 'image') {
  		      challenge.requirements.pictures--;
  		      challenge.dataElements.push(dataElement);
  	    }
  	    if (challenge.requirements.pictures <= 0) {
  		      challenge.finished = true;
  	    }
      }
  	// 'check': function (dataElement, challenge) {
    //
    //   if(dataElement.type === "image"){
    //     console.log(dataElement.type);
    //     Images.findOne(dataElement.data.id);
    //   }
    //   var options = {
    //     headers: {
    //       "Ocp-Apim-Subscription-Key": "e23b9cad8ef54a63beb429b074a7b73b",
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //     content: "{'Url': 'http://www.gettyimages.de/gi-resources/images/ImageCollections/image5_170127819.jpg'}",
    //     params: {
    //       "visualFeatures": "All"
    //     }
    //   }
    //   Meteor.http.post("https://api.projectoxford.ai/vision/v1/analyses?", options, function(err, res) {
    //     // console.log('err', err);
    //     // console.log('res', res);
    //     return res;
    //   });
    // }
  }];


Meteor.publish('challenges',function() {
    return challenges.find();
});

Meteor.methods({
    'newChallenge': function() {
    	var chNum = Math.floor(Math.random() * challengeDefs.length);
    	return challenges.insert({
    	    'id': chNum,
          'title': challengeDefs[chNum].title,
          'description': challengeDefs[chNum].description,
    	    'requirements': challengeDefs[chNum].requirements,
    	    'dataElements': [],
    	    'finished': false
    	});
    },
    'checkData': function(dataID) {
    	var ch = challenges.findOne();
      var data = dataElements.findOne(dataID);
      challengeDefs[ch.id].check(data, ch);
    	challenges.update(ch._id, ch);

      // var finished_challenges = [];
      //
    	// for (var ch in activeChs) {
    	//     ch = activeChs;
      // console.log("Checking challenge", ch);
    	//     challengeDefs[ch.id].check(data, ch);
    	//     if (ch.finished) {
    	// 	      finished_challenges.push(ch._id);
	    //    }
    	// }
    	// return finished_challenges;
    }
});
