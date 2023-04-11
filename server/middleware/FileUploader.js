/* FILE STORAGE */
import multer from "multer";
var uploader = ()=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  return multer({ storage });

}

export default uploader