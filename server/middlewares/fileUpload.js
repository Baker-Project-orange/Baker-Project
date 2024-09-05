const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const app = require("../config/firebaseConfig");
const dayjs = require("dayjs");
exports.filesUpload = async (req, res, next) => {
  const files = req.body.files;
  req.urls = [];
  try {
    if (files !== undefined) {
      for (let i = 0; i < files.length; i++) {
        const storage = getStorage(app);
        const imagesRef = ref(
          storage,
          `/images/${req.user}-${dayjs.unix()}-${i}.jpg`
        );

        await uploadBytes(imagesRef, files[i]);
        const url = getDownloadURL(imagesRef);
        req.urls.push(url);
      }
      next();
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
};

exports.fileUpload = async (req, res, next) => {
  const file = req.body.file;
  console.log(file);
  try {
    if (file !== undefined) {
      const storage = getStorage(app);
      const imagesRef = ref(storage, `/images/${req.user}-${dayjs.unix()}.jpg`);
      await uploadBytes(imagesRef, file);
      const url = await getDownloadURL(imagesRef);
      req.url = url;
      next();
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
    res.status(501).json({ message: "Internal server error", error: e });
  }
};
