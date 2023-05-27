"use strict";

const csvText =
  "44.38,34.33,Алушта,31440,\n" +
  "49.46,30.17,Біла Церква,200131,\n" +
  "49.54,28.49,Бердичів,87575,\n" +
  "\n#\n" +
  "46.49,36.58,#Бердянськ,121692,\n" +
  "49.15,28.41,Вінниця,356665,\n" +
  "#45.40,34.29,Джанкой,43343,";

const text = "Привіт з Вінниця. Я Біла Церква.";

function addCityInfo(csvText) {
  const lineToArray = function (line) {
    const splitLine = line.replace("#", "").split(",");
    const keys = ["x", "y", "name", "population"];
    return keys.reduce((acc, key, index) => {
      acc[key] = splitLine[index];
      return acc;
    }, {});
  };

  const arrayToObject = function (acc, item, index) {
    acc[item["name"]] = {
      population: item["population"],
      rating: ++index,
    };
    return acc;
  };

  const cities = csvText
    .split("\n")
    .filter((line) => /^(\d\d.\d\d,){2}"?[а-яіїє'\s#]+"?,\d+,/i.test(line))
    .map(lineToArray)
    .sort((a, b) => +b.population - +a.population)
    .slice(0, 10)
    .reduce(arrayToObject, {});

  return function (text) {
    const regex = new RegExp(Object.keys(cities).join("|"), "g");
    return text.replace(
      regex,
      (match) =>
        `${match} (${cities[match].rating} место в ТОП-10 самых крупных городов Украины, население ${cities[match].population} человек)`
    );
  };
}

console.log(addCityInfo(csvText)(text));
