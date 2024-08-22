import multer from "multer";

const storage = multer.diskStorage({
  // Configuring the destination directory for uploaded files
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // Configuring the filename for uploaded files
  filename: function (req, file, cb) {
    //unique nam for files
    const uniqueSuffix = Date.now() + "_" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({
  storage,
});
