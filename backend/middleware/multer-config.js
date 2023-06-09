const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./backend/images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const timestamp = new Date().getTime();
    const filename = file.originalname.replace(/\s/g, "_");
    callback(null, `${filename}_${timestamp}.${extension}`);
  },
});

module.exports = multer({ storage: storage }).single("image");
