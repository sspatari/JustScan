fs = require('fs')

function createResultFile(text) {
  fs.writeFile("./result.txt", text, function (err) {
    if (err) {
      return console.log(err);
    }
    // console.log(text)
    console.log("Succesufully write to result.txt")
  })
  // console.log("aArticolul " + (article+1) + ".")
  // console.log("bArticolul " + article + ".")
}

function getNeededInfo(str, article, subsection) {
  start_index = str.lastIndexOf("Articolul " + article + ".")
  end_index = str.lastIndexOf("Articolul " + (article+1) + ".")

  if(start_index == -1) return "Article with this number does not exist"
  if(end_index == -1) {
    textInfo = str.substring(start_index)
  }else {
    textInfo = str.substring(start_index, end_index)
  }

  if(subsection == null) {
    return textInfo
  } else {
    start_index = textInfo.lastIndexOf("(" + subsection + ")")
    end_index = textInfo.lastIndexOf("(" + (subsection+1) + ")")

    if(start_index == -1) return "Subsection with this number does not exist"
    if(end_index == -1) {
      textInfo = textInfo.substring(start_index)
    }else {
      textInfo = textInfo.substring(start_index, end_index)
    }
    return textInfo
  }

}

module.exports = {
  getNeededInfo,
  createResultFile
}
