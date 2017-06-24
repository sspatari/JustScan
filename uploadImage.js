const router = require('express').Router(),
      multer = require('multer')

fileList = []
var storage = multer.diskStorage({
  destination: './public/images/',
  filename: function (req, file, cb) {
    let name = 'image' + '.' + file.originalname.split('.')[1]
    fileList.push(name)
    cb(null, name)
  }
});

var upload = multer({ storage: storage });

router.post('/',upload.array('avatar', 20), function (req, res, next) {
  console.log('req===================================')
  console.log(req)
})

module.exports = router
