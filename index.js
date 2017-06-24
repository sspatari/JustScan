const express = require('express'),
      app = express(),
      config = require('./config'),
      fs = require('fs'),
      PDFParser = require("pdf2json")
      extratInfo = require("./extractInfo"),
      uploadImage = require("./uploadImage")

let pdfParser = new PDFParser(this,1)

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
  textInfo = extratInfo.getNeededInfo(data, 10, 1)
  console.log(textInfo)
  extratInfo.createResultFile(textInfo)
})

// pdfParser.loadPDF("./pdfFolder/lex.justice.pdf")

app.use('/api/v1/upload', uploadImage)
app.get('/api/v1', (req, res)=> {
  res.send('Salut')
})

app.listen(config.port, () => {
  console.log('Application is running on port ' + config.port)
})
