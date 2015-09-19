Template.newEntry.events({
  'submit form': function(event) {
    event.preventDefault();

    var dataElement = {};
    var memo = {};
    
    dataElement.text = event.target.text.value;
    memo.title = event.target.title.value;

    console.log(Meteor.call('insertDataElement', dataElement));
    memo.dataElements = [];

    console.log(dataElement);

  }
})
