const express = require('express'),
      app = express(),
      config = require('./config'),
      fs = require('fs'),
      uploadImage = require("./uploadImage")




app.use('/api/v1/upload', uploadImage)
app.get('/api/v1', (req, res)=> {
  res.send('Salut')
})

app.listen(config.port, () => {
  console.log('Application is running on port ' + config.port)
})
