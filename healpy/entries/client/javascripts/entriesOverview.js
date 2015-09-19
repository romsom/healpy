Template.entriesOverview.helpers({
  entries: function () {
    return memos.find();
  },
  text: function() {
    return dataElements.findOne(this.data[0]).data.text;
  }
});
