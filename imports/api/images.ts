import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';

export const ImagesCollection = new FilesCollection({
  storagePath: "assets/app/whatsapp/uploads/Images",
  downloadRoute: "/files/images",
  permissions: 0o755,
  cacheControl: "public, max-age=31536000",
  collectionName: 'Images',
  allowClientCode: false,
  onBeforeUpload(file) {
    if(file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return "Please upload image, with size equal or less than 10MB";
  }
});

if(Meteor.isServer) {
  Meteor.publish('images.all', function() {
    return ImagesCollection.find();
  });
  
  ImagesCollection.allowClient();
}