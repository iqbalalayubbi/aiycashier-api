var admin = require("firebase-admin");
const {v4:uuidv4} = require('uuid')

var serviceAccount = require("../key.json");
const {getFirestore} = require('firebase-admin/firestore')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket:'gs://vue-firebase-263de.appspot.com'
});

const bucket = admin.storage().bucket();

async function uploadFile(path,dest){
  const metadata = {
    metadata : {
      firebaseStorageDownloadTokens: uuidv4()
    },
    contentType : 'image/png',
    cacheControl : 'public,max-age=31536000'
  }

  const storage = await bucket.upload(path,{
    gzip : true,
    metadata : metadata,
    destination:dest
  })
  return storage[0].metadata
}

const db = getFirestore()

module.exports = {db,uploadFile}