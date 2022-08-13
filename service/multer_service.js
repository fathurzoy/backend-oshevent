const multer = require("multer");
const path = require("path");


//    UPLOAD PRODUCT
const p_storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(" ").join("-"));
  },
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../static/public/uploads/product"));
  },
});


//  UPLOAD BANNER
const banner_storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(" ").join("-"));
  },
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../static/public/uploads/banner"));
  },
});


//  UPLOAD AVATAR
const avatar_storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(" ").join("-"));
  },
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../static/public/uploads/avatar"));
  },
});


//  UPLOAD BUKALAPAK
const pdf_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/bukalapak"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


//  UPLOAD TOKOPEDIA
const pdf_tokpedia = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/tokopedia"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


//  UPLOAD SHOPEE
const pdf_shopee = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/shopee"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});


//  UPLOAD PDF
const pdf_order_upload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/pdf_uploads/"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      req.body.user_id + "_" + Date.now() + "." + file.mimetype.split("/")[1]
    );
  },
});

//UPLOAD BUKTI TRANSFER
const bukti_transfer_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/bukti_transfer/"));
  },
  filename: (req, file, cb) => {
    let { user_id, order_id } = req.body;
    cb(null, `${user_id}_${order_id}.${file.mimetype.split("/")[1]}`);
  },
});

//UPLOAD NOTIFICATION IMAGE
const notification_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/notification/"));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.user_id + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

//UPLOAD BUKTI PEMBAYARAN PREMIUM
const premium_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../static/public/uploads/premium/"));
  },
  filename: (req, file, cb) => {
    cb(null, req.body.user_id + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const upload_avatar = multer({ storage: avatar_storage });
const upload_banner = multer({ storage: banner_storage });
const pdf_bukalapak = multer({ storage: pdf_storage });
const upload_product = multer({ storage: p_storage });
const upload_tokopedia = multer({ storage: pdf_tokpedia });
const upload_shopee = multer({ storage: pdf_shopee });
const upload_pdf = multer({ storage: pdf_order_upload });
const upload_bukti_transfer = multer({ storage: bukti_transfer_storage });
const upload_notification_images = multer({ storage: notification_storage });
const upload_premium = multer({ storage: premium_storage });

module.exports = {
  upload_product,
  upload_banner,
  upload_avatar,
  pdf_bukalapak,
  upload_shopee,
  upload_tokopedia,
  upload_pdf,
  upload_bukti_transfer,
  upload_notification_images,
  upload_premium,
};
