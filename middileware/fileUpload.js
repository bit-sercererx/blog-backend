const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "static/images/");
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-";
    const filename = uniquesuffix + file.originalname;
    cb(null, filename);
  },
});
const fileFilterFn = (req, file, cb) => {
  let filetypes = /jpeg||png||jpg/;
  let mimetype = filetypes.test(file.mimetype);
  let extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
};
const fileUplod = multer({ storage: storage, fileFilter: fileFilterFn });
module.exports = fileUplod;
