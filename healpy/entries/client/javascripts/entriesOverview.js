Template.entriesOverview.helpers({
  entries: function () {
    return memos.find();
  },
  renderText: function() {
    var dataElement = dataElements.findOne(this.toString());
    // console.log(dataElement);
    if(dataElement.type === "text" && dataElement) return dataElement.data.text;
  },
  getImageUrl: function(){
    console.log('this', this);
    for (var index in this.data) {
      console.log(this.data[index]);
      var dataElement = dataElements.findOne(this.data[index]);
      if(dataElement.type === "image") {
        return Images.findOne(dataElement.data.id).url();
      } else {
        return false;
      }
    }
  }
});

Template.challenges.helpers({
  challenge: function() {
    var challenge = challenges.findOne();
    console.log(challenge);
    if(!challenge){
      Meteor.call('newChallenge', function(err, res) {
        return challenges.findOne();
      });
    } else {
      return challenge;
    }
  }
});

Template.challenges.events({
  'click button': function() {
    currentChallenge = challenges.findOne();
    challenges.remove(currentChallenge._id);
    Meteor.call('newChallenge');
  }
});
