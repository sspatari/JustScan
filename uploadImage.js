const router = require('express').Router(),
      multer = require('multer'),
      extratInfo = require("./extractInfo"),
      PDFParser = require("pdf2json")

var Tesseract = require('tesseract.js')

let pdfParser = new PDFParser(this,1)

var articleNumber

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

router.post('/',upload.single('avatar'), function (req, res, next) {
  myImage = './public/images/image.jpg'
  console.log("Image received")
  Tesseract.recognize(myImage, {
      lang: 'eng'
  })
  .then(function(result){
      console.log(result.text)
      let searchName = "Articolul"
      let startIndex = result.text.search(searchName) + searchName.length
      startIndex++
      while(isNaN(result.text[startIndex])) {
        startIndex++
      }
      let lastIndex = startIndex
      while(!isNaN(result.text[lastIndex])) {
        lastIndex++
      }
      articleNumber = parseInt(result.text.substring(startIndex,lastIndex))
      console.log("Article Number:" + articleNumber)
      pdfParser.loadPDF("./pdfFolder/lex.justice.pdf")
  })
})



pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
  data = pdfParser.getRawTextContent()
  // fs.writeFile("./test.txt", pdfParser.getRawTextContent())
  //
  // fs.readFile('./test.txt', 'utf8', function (err,data) {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   console.log("Succesufully read from text.txt")
  //   createFileData(data, 151)
  // })
  textInfo = extratInfo.getNeededInfo(data, articleNumber)
  console.log(textInfo)
  extratInfo.createResultFile(textInfo)
})

module.exports = router
