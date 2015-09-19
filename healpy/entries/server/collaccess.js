// neccessary properties
var dataElementProperties = ['type', 'data'];
var challengeProperties = ['id', 'requirements', 'dataElements', 'finished'];
var memoProperties = ['dataElements'];

var insertElement = function(elem, props, coll) {
    // verification
  //   for (var prop in props) {
	// if (!elem.hasOwnProperty(prop))
	//     return [false, null];
  //   }
    // insertion
    elem.timestamp = new Date();

    var id = coll.insert(elem);
    return {'id': id};
}

var updateElement = function(id, coll, props, elem) {
    // verification
     for (var prop in props) {
	if (!elem.hasOwnProperty(prop))
	    return [false, null];
    }
    // update with new timestamp
    elem.timestamp = new Date();
    return [true, coll.update(id, elem)];
}

Meteor.methods({
  'insertDataElement' : function(dataElement) {
    return insertElement(dataElement, dataElementProperties, dataElements);
  },
  'insertChallenge' : function(challenge) {
    return insertElement(challenge, challengeProperties, challenges);
  },
  'updateChallenge' : function(id, challenge) {
    return updateElement(id, challenges, challengeProperties, challenge);
  },
  'insertMemo' : function(memo) {
    return insertElement(memo, memoProperties, memos);
  },
  'updateMemo' : function(id, memo) {
    return updateElement(id, memos, memoProperties, memo);
  },
  'clear' : function() {
    challenges.remove({});
    memos.remove({});
    dataElements.remove({});
  }
});
