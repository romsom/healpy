uploadedFiles = new Meteor.Collection(null);
Template.fileUpload.events({
  'change .fileInput': function(event, template) {
    FS.Utility.eachFile(event, function(file) {
      var dataElement = {
        type: "image",
        data: {}
      };
      Images.insert(file, function (err, fileObj) {
        if (err){
          console.log( err);
        } else {

          dataElement.data.id = fileObj._id;
          dataElement.data.collectionName = fileObj.collectionName;

          console.log(dataElement);
          console.log("success", fileObj);

          Meteor.call('insertDataElement', dataElement, function(error, id) {
            if(error) console.log(error);
            Meteor.call('checkData', id.id);
            console.log(dataElements.findOne(id.id));
            uploadedFiles.insert({dataElementId: id});
          });
        }
      });
    });
  }
});
