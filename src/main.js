import compareFonts from './lib/compare-fonts';

const folder = '/Users/valeriya/Documents/compare-fonts/fontsSlice/'

main()

async function main() {

  var result = {}
  var fs = require('fs');
  var files = fs.readdirSync(folder).filter(file => file.endsWith(".ttf"));

  for (var index in files)  {
    var firstFontName = files[index]
    var firstFontPath = folder + firstFontName

    var array = []

    result[firstFontName.slice(0, -4)] = []

    for (var secondIndex in files) {
      let secondFontName = files[secondIndex]
      var secondFontPath = folder + secondFontName

      let similarityIndex = await compareFonts(firstFontPath, secondFontPath)

      array.push({name: secondFontName.slice(0, -4), value: similarityIndex})

    }

    array.sort(function(a,b) {
      return b.similarity-a.similarity
    })

    console.log("font with name " + firstFontName + " is finished");
    result[firstFontName.slice(0, -4)] = array
  }

  var json = JSON.stringify(result)

  fs.writeFile('myjsonfile.json', json, 'utf8', function(error) { });
}

class SimilarityFont {
  constructor(fontName, similarityIndex) {
    this.fontName = fontName
    this.similarityIndex = similarityIndex
  }
}
