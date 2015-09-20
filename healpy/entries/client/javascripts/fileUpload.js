Template.fileUpload.events({
  'change .fileInput': function(event, template) {
    console.log("Uploading files ...")
    FS.Utility.eachFile(event, function(file) {
      Images.insert(file, function (err, fileObj) {
        if (err){
          console.log(err);
        } else {
          console.log("success", fileObj);
        }
      });
    });
  }
});
