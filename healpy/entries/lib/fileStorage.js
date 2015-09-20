var imageStore = new FS.Store.FileSystem("images", {
  path: "/Users/erik/Development/current/healpy/healpy/files/images"
});

Images = new FS.Collection("images", {
  stores: [imageStore]
});
