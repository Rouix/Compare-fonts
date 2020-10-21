import compareFonts from './lib/compare-fonts';

const folder = '/Users/valeriya/compare-fonts/fonts/';

main();

async function main() {

  var result = {};
  var fs = require('fs');
  var files = fs.readdirSync(folder).filter(file => file.endsWith(".ttf"));

  for (var index = 0; index < 3; index++) {
    var firstFontName = files[index];
    var firstFontPath = folder + firstFontName;

    var array = [];

    result[firstFontName] = [];

    for (var index = 0; index < 2; index++) {
      let secondFontName = files[index];
      var secondFontPath = folder + secondFontName;

      let similarityIndex = await compareFonts(firstFontPath, secondFontPath);

      var value = new SimilarityFont(secondFontName, similarityIndex);
      array.push({ fontName: secondFontName, similarity: similarityIndex });
    }

    array.sort(function (a, b) {
      return b.similarity - a.similarity;
    });

    result[firstFontName] = array;

    //console.log(json);
  }

  var json = JSON.stringify(result);
  fs.writeFile('myjsonfile.json', json, 'utf8', function (error) {});
}

class SimilarityFont {
  constructor(fontName, similarityIndex) {
    this.fontName = fontName;
    this.similarityIndex = similarityIndex;
  }
}