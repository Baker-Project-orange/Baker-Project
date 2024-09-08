const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");
const app = require("../config/firebaseConfig");
const dayjs = require("dayjs");

const uploadFileToFirebase = async (file, user, index = null) => {
  const storage = getStorage(app);
  const timestamp = Date.now();
  console.log(file);
  const filePath =
    index !== null
      ? `/images/${user}-${timestamp}-${index}-${file.originalname}`
      : `/images/${user}-${timestamp}-${file.originalname}`;

  const metatype = { contentType: file.mimetype, name: file.originalname };

  const imagesRef = ref(storage, filePath);
  await uploadBytes(imagesRef, file.buffer, metatype);
  return await getDownloadURL(imagesRef);
};

// Middleware to upload files for each step in a recipe
exports.filesUpload = async (req, res, next) => {
  const steps = req.files;
  const chefID = req.user;
  req.body.steps = JSON.parse(req.body.steps);
  req.body.ingredients = JSON.parse(req.body.ingredients);
  req.body.overviewPicture = await uploadFileToFirebase(steps[0], chefID, 0);
  let mediaCounter = 1;
  try {
    for (let i = 0; i < req.body.steps.length; i++) {
      const step = req.body.steps[i];
      if (!step.stepMedia) {
        continue;
      } else {
        req.body.steps[i].stepMedia = await uploadFileToFirebase(
          steps[mediaCounter]
        );
        mediaCounter++;
      }
    }

    next();
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ message: "Error uploading files", error: e.message });
  }
};

exports.fileUpload = async (req, res, next) => {
  const file = req.file;

  try {
    if (file) {
      const url = await uploadFileToFirebase(file, req.user);
      req.url = url;
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error uploading file", error: e.message });
  }
};
