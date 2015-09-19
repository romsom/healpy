// Collections
var dataElements = new Mongo.Collection('dataElements');
var challenges = new Mongo.Collection('challenges');
var memos = new Mongo.Collection('memos');
// neccessary properties
var dataElementProperties = ['type', 'data'];
var challengeProperties = ['type', 'dataElements', 'finished'];
var memoProperties = ['dataElements'];

var insertElement = function(elem, props, coll) {
    // verification
    for (var prop in props) {
      if (!elem.hasProperty(prop))
	      return {false, null};
    }
    // insertion
    elem.timestamp = new Date();
    return {true, coll.insert(elem)};
}

var updateElement = function(id, coll, props, elem) {
    // verification
    for (var prop in props) {
    	if (!elem.hasProperty(prop))
        return {false, null};
    }
    // update with new timestamp
    elem.timestamp = new Date();
    return {true, coll.update(id, elem)};
}

Meteor.methods({
  'insertDataElement' : function(dataElement) {
    insertElement(dataElement, dataElementProperties, dataElements);
  },
  'insertChallenge' : function(challenge) {
    insertElement(challenge, challengeProperties, challenges);
  },
  'updateChallenge' : function(id, challenge) {
    updateElement(id, challenges, challengeProperties, challenge);
  },
  'insertMemo' : function(memo) {
    insertElement(memo, memoProperties, memos);
  },
  'updateMemo' : function(id, memo) {
    updateElement(id, memos, memoProperties, memo);
  },
  'clear' : function() {
    challenges.remove({});
    memos.remove({});
    dataElements.remove({});
  }
});
