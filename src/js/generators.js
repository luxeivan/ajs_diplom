/**
 * Generates random characters
 *
 * @param allowedTypes iterable of classes
 * @param maxLevel max character level
 * @returns Character type children (ex. Magician, Bowman, etc)
 */

export function* characterGenerator(allowedTypes, maxLevel) {
  // TODO: write logic here
  const rand = getRandomIntInclusive(0, allowedTypes.length - 1)
  yield new allowedTypes[rand](maxLevel);
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const team = [];
  for (let i = 0; i < characterCount; i++) {
    for (let character of characterGenerator(allowedTypes, maxLevel)) {
      team.push(character);
    }
  }
  return team;
}

//Генератор случайных целых чисел
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
