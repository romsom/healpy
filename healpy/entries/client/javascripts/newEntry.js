Template.newEntry.events({
  'submit form': function(event) {
    event.preventDefault();

    console.log("event");

    var dataElement = {
      type:"",
      data: {}
    };
    var memo = {};

    var insertMemo = function (dataElementIds) {
        console.log('insertMemo');
        memo.title = event.target.title.value;
        memo.data = [];

        if(!memo.title) {
          console.error("No Title", console.log(memo.title));
          return;
        }

        for (index in dataElementIds) {
          console.log(dataElementIds[index]);
          memo.data.push(dataElementIds[index]);
        }

        console.log(memo.data);
        Meteor.call('insertMemo', memo);
    }

    if(event.target.text) {
      dataElement.data.text = event.target.text.value
      dataElement.type = 'text';
      Meteor.call('insertDataElement', dataElement, function (error, response) {
        if(error) console.log('error', error);
        var dataElementIds = [];
        dataElementIds[0] = response.id;
        insertMemo(dataElementIds);
      });
    } else {
      console.log("No Text!");
      if (uploadedFiles.findOne()) {
        var uploadedFilesIds = uploadedFiles.find().fetch();
        var dataElementIds = [];
        for (index in uploadedFilesIds) {
          dataElementIds.push(uploadedFilesIds[index].dataElementId.id);
        }
        insertMemo(dataElementIds);
        uploadedFiles.remove({});
      } else {
        console.log("no files");
      }
    }

  }
})
