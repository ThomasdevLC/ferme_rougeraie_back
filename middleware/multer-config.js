const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function cleanFileName(filename) {
  let cleanedName = filename.replace(/\s+/g, "_");
  cleanedName = cleanedName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  cleanedName = cleanedName.replace(/[^a-zA-Z0-9-_\.]/g, "");

  return cleanedName;
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const extension = MIME_TYPES[file.mimetype];
    const timestamp = new Date().getTime();
    const originalFileName = req.body.name; // Nom de fichier d'origine
    const cleanedFileName = cleanFileName(originalFileName); // Nettoyer le nom de fichier

    callback(null, `${cleanedFileName}_${timestamp}.${extension}`);
  },
});

module.exports = multer({ storage: storage }).single("image");
