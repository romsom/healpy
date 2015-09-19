Template.newEntry.events({
  'submit form': function(event) {
    event.preventDefault();

    var dataElementId;
    var dataElement = {
      type:"",
      data: {}
    };
    var memo = {};


    dataElement.type = 'text';
    dataElement.data.text = event.target.text.value;
    Meteor.call('insertDataElement', dataElement, function (error, response) {
      if(error) console.log('error', error);

      dataElementId = response.id;

      memo.title = event.target.title.value;
      memo.data = [];
      memo.data[0] = dataElementId;
      Meteor.call('insertMemo', memo);
    });
  }
})
