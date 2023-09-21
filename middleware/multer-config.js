const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const timestamp = new Date().getTime();
    const filename = req.body.name;
    callback(null, `${filename}_${timestamp}.${extension}`);
  },
});

module.exports = multer({ storage: storage }).single("image");
