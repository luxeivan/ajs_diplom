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

/*export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const team = [];
  for (let i = 0; i < characterCount; i++) {
    for (let character of characterGenerator(allowedTypes, maxLevel)) {
      let position = getRandomIntInclusive(0, 1) + 8 * getRandomIntInclusive(0, 7);
      team.push({ position: position, character: character });
    }
  }
  return team;
}*/


export function generateTeam(allowedTypes, maxLevel, characterCount) {
  // TODO: write logic here
  const arrNumb = [];
  const team = [];
  let n, p;
  for (let i = 0; i < characterCount; i += 1) {
    do {
      n = getRandomIntInclusive(0, 1) + 8 * getRandomIntInclusive(0, 7);
      p = arrNumb.includes(n);
      if (!p) {
        arrNumb.push(n);
      }
    }
    while (p);
  }

  arrNumb.forEach(item => {
    for (let character of characterGenerator(allowedTypes, maxLevel)) {
      team.push({ position: item, character: character });
    }
  });

  
  return team;
}

//Генератор случайных целых чисел
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
