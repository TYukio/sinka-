const multer = require('multer');
const path = require('path');

const tempDiskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'public', 'temp'))
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const tempDiskUpload = multer({ storage: tempDiskStorage  });

module.exports = tempDiskUpload;