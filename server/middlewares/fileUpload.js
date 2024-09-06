const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const app = require("../config/firebaseConfig");
const dayjs = require("dayjs");
exports.filesUpload = async (req, res, next) => {
  const steps = req.body.steps;
  req.urls = [];
  try {
    if (steps !== undefined) {
      for (let i = 0; i < steps.length; i++) {
        const storage = getStorage(app);
        const file = steps[i].stepMedia;
        if (file !== undefined) {
          const imagesRef = ref(
            storage,
            `/images/${req.user}-${dayjs.unix()}-${i}.jpg`
          );

          await uploadBytes(imagesRef, file);
          const url = await getDownloadURL(imagesRef);
          req.body.steps[i].stepMedia = url;
        }
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
