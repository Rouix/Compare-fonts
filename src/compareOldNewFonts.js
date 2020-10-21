import compareFonts from './lib/compare-fonts';

const oldFiles = '/Users/valeriya/Downloads/test/old/'
const newFiles = '/Users/valeriya/Downloads/test/new/'

compare()

async function compare() {

  var fs = require('fs');
  var json = JSON.parse(fs.readFileSync('./myjsonfile.json'));
  var result = {}
  var oldTTF = fs.readdirSync(oldFiles).filter(file => file.endsWith(".ttf"));
  var newTTF = fs.readdirSync(newFiles).filter(file => file.endsWith(".ttf"));

  //сгенерировали файл для новый шрифтов
  for (var index in newTTF)  {
    var firstFontName = newTTF[index]
    var firstFontPath = newFiles + firstFontName

    var array = []

    json[firstFontName.slice(0, -4)] = []

    for (var secondIndex in newTTF) {
      let secondFontName = newTTF[secondIndex]

      if (firstFontName != secondFontName) {
        var secondFontPath = newFiles + secondFontName

        let similarityIndex = await compareFonts(firstFontPath, secondFontPath)

        array.push({name: secondFontName.slice(0, -4), value: similarityIndex})
      }

    }

    for (var secondIndex in oldTTF) {
      let secondFontName = oldTTF[secondIndex]
      var secondFontPath = oldFiles + secondFontName

      let similarityIndex = await compareFonts(firstFontPath, secondFontPath)

      array.push({name: secondFontName.slice(0, -4), value: similarityIndex})

    }

    array.sort(function(a,b) {
      return b.similarity-a.similarity
    })

    console.log("font with name " + firstFontName + " is finished");
    json[firstFontName.slice(0, -4)] = array
  }

//надо сравнить старые с новыми
  for (var index in oldTTF)  {
    var firstFontName = oldTTF[index]
    var firstFontPath = oldFiles + firstFontName

    var array = []

    for (var secondIndex in newTTF) {
      let secondFontName = newTTF[secondIndex]
      var secondFontPath = newFiles + secondFontName

      let similarityIndex = await compareFonts(firstFontPath, secondFontPath)

      array.push({name: secondFontName.slice(0, -4), value: similarityIndex})

    }

    array.sort(function(a,b) {
      return b.similarity-a.similarity
    })

    console.log("font with name " + firstFontName + " is finished");
    var oldArray = json[firstFontName.slice(0, -4)]
    json[firstFontName.slice(0, -4)] = oldArray.concat(array)
  }


  var json = JSON.stringify(json)

  fs.writeFile('myjsonfile.json', json, 'utf8', function(error) { });
}
