/// Game Structure and Utilities ///

const prompt = require('prompt-sync')();

const characters = {
  hat: '^',
  hole: 'O',
  field: '▓', // Alternative characher: ▒
  path: '░', // This was originally the field character in the starter code.
  player: '*'
}

class Field {
  constructor(input) { // input represents the field.
    this.field = input;
  }

  print() { // Print the field.
    for (const row of this.field) console.log(row.join(''));
  }

  adjustSpace(coordinates, kind) { // Switch out the character in a space of the field with another character.
    // For kind, adjustSpace() expects 'hat', 'hole', 'field', 'path', or 'player'.
    this.field[coordinates[0]][coordinates[1]] = characters[kind];
  }
}

const movePlayer = (coordinates, direction, field) => { // Move player on the field in a specified direction.

  if (!direction.match(/^[uldr]$/)) { // Check for proper character input
    console.log('Invalid input! Enter u, l, d, or r for up, left, down, right, respectively.')
    return coordinates;
  }

  if ((direction === 'u' && coordinates[0] === 0) || // Check if player is trying to move up while already at top edge of field.
      (direction === 'l' && coordinates[1] === 0) || // Check if player is trying to move left while already at left edge of field.
      (direction === 'd' && coordinates[0] === 2) || // Check if player is trying to move down while already at bottom edge of field.
      (direction === 'r' && coordinates[1] === 2)) { // Check if player is trying to move right while already at right edge of field.
    console.log('You\'re at the edge of the field and can\'t move in that direction!');
    return coordinates;
  }

  switch (direction) {
    case 'u':
      field.adjustSpace(coordinates, 'path');
      coordinates[0]--;
      field.adjustSpace(coordinates, 'player');
      console.log('Moved up.');
      return coordinates;
    case 'l':
      field.adjustSpace(coordinates, 'path');
      coordinates[1]--;
      field.adjustSpace(coordinates, 'player');
      console.log('Moved left.');
      return coordinates;
    case 'd':
      field.adjustSpace(coordinates, 'path');
      coordinates[0]++;
      field.adjustSpace(coordinates, 'player');
      console.log('Moved down.');
      return coordinates;
    case 'r':
      field.adjustSpace(coordinates, 'path');
      coordinates[1]++;
      field.adjustSpace(coordinates, 'player');
      console.log('Moved right.');
      return coordinates;
  }
}



/// Game Preparation ///

const myField = new Field([
  ['*', '▓', 'O'],
  ['▓', 'O', '▓'],
  ['▓', '^', '▓'],
]);

let direction;
let gameEnd = false; // Tracking whether a game end condition has been met.

// All coordinates match Field nested array structure. Origin is at top left. First number represents position on vertical axis, with the positive direction being down. Second number represents position on horizontal axis, with positive direction being right.
let playerCoordinates = [0, 0];
const hatCoordinates = [2, 1];
const holeCoordinates = [[0, 2], [1, 1]];



//// Gampeplay ////

console.clear();
console.log('*** Welcome to Find Your Hat! ***\n\n\n');
myField.print();
console.log();
console.log('Which direction would you like to move?');
direction = prompt('> ');

while (!gameEnd) {
  console.clear()
  console.log('*** Welcome to Find Your Hat! ***\n');
  playerCoordinates = movePlayer(playerCoordinates, direction, myField);
  console.log();
  myField.print();
  console.log();
  if (playerCoordinates.toString() === hatCoordinates.toString()) { // LESSON LEARNED: Can't do a simple equality for arrays, because arrays are of type object and so aren't compared by value but by where they are referencing.
    console.log('You found your hat! Nice work!\n')
    gameEnd = true;
  } else if (holeCoordinates.some(hole => playerCoordinates.toString() === hole.toString())) {
    console.log('You\'ve fallen into a hole!\n');
    console.log('*** GAME OVER ***\n');
    gameEnd = true;
  } else {
    console.log('Which direction would you like to move?');
    direction = prompt('> ');
  }
}