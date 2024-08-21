// app.js

const multer = require("multer");
const path = require("path");
//
const storageMap = {
  card: "../../public/card-images",
  player: "../../public/player-images",
  test: "../../public/test-images",
};

function multerStorage(location) {
  console.log(path.join(__dirname, location));

  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, location)); // Save files to public/upload
    },
    filename: function (req, file, cb) {
      const timestamp = Date.now();
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);

      cb(null, `${basename}-${timestamp}${ext}`);
    },
  });
}

const uploadPlayerImage = multer({
  storage: multerStorage(storageMap.player),
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("playerImage");

const uploadCardImage = multer({
  storage: multerStorage(storageMap.card),
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("cardImage");

const uploadMultiple = multer({
  storage: multerStorage(storageMap.test),
  limits: { fileSize: 1000000 }, // 1MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("files", 5);

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images only! (jpeg, jpg, png, gif)");
  }
}

module.exports = {
  uploadMultiple,
  uploadCardImage,
  uploadPlayerImage,
};
