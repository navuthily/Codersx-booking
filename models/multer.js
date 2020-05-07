const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/avatar');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    },
});
const upload = multer({ storage }); 
exports.uploadMulter = upload;
