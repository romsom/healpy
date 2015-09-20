var imageStore = new FS.Store.FileSystem("images", {
  path: "/Users/frankaellenwittek/Sites/healpy/healpy/files/images"
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});
