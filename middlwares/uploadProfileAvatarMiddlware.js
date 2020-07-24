const multer = require('multer');

// Storage files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/avatars');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString()+file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/png' || 
      file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const uploadProfileAvatarMiddlware = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 24
  },
  fileFilter: fileFilter
});

module.exports = uploadProfileAvatarMiddlware;