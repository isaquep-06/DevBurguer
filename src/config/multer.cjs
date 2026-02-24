const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'), // mesma coisa que -->  ../../uploads
    filename: (_req, file, callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`);
      return callback(null, uniqueName);
    },
  }),
};
