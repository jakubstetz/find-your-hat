//// Game Structure and Utilities ////

// Essential Variables //
const prompt = require('prompt-sync')();
let direction;
let gameEnd = false; // Track whether a game end condition has been met.
let onHat = false; // Track whether the player has landed on their hat.
let onHole = false; // Track whether the player has landed on a hole.

const characters = {
  hat: '^',
  hole: 'O',
  field: '▓', // Alternative characher: ▒
  path: '░', // This was originally the field character in the starter code.
  player: '*'
}

// Field Class //
class Field {
  constructor(input) { // input represents the field.
    this.field = input;
  }

  print() { // Print the field.
    for (const row of this.field) console.log(row.join(''));
  }

  checkStatus(coordinates) { // Check if player has landed on their hat or a hole.
    if (this.field[coordinates[0]][coordinates[1]] === characters.hat) {
      return [true, false];
    } else if (this.field[coordinates[0]][coordinates[1]] === characters.hole) {
      return [false, true];
    } else return [false, false];

    // Return statements should be assigned to [onHat, onHole];
  }

  adjustSpace(coordinates, kind) { // Switch out the character in a space of the field with another character.
    // For kind, adjustSpace() expects 'hat', 'hole', 'field', 'path', or 'player'.
    this.field[coordinates[0]][coordinates[1]] = characters[kind];
  }

  static generateField(width, height, difficulty) { // Generate a field using a given width and height.
    const newField = [];

    // Generate a bare field, with no holes or hat.
    for (let j = 0; j < height; j++) {
      newField[j] = new Array(width).fill(characters.field);
    }

    // Place player on the starting position.
    newField[0][0] = characters.player;

    // Place hat on the field.
    const hatCoordinates = [0, 0]
    while (hatCoordinates[0] === 0 && hatCoordinates[1] === 0) { // Generate random hat coordinates until hat is located on a space that isn't the players' starting position
      hatCoordinates[0] = Math.floor(Math.random()*height);
      hatCoordinates[1] = Math.floor(Math.random()*width);
    }
    newField[hatCoordinates[0]][hatCoordinates[1]] = characters.hat;

    // Generate holes on field using difficulty input.
    const fieldArea = width*height;
    const numHoles = Math.ceil(fieldArea/15)*difficulty; // Formula for determining the number of holes on the field depending on field size and difficulty.
    let currentHoles = 0;
    const newHoleCoordinates = [0,0];
    while (currentHoles !== numHoles) {
      while ((newHoleCoordinates[0] === 0 && newHoleCoordinates[1] === 0) ||
             (newHoleCoordinates[0] === hatCoordinates[0] && newHoleCoordinates[1] === hatCoordinates[1])) { // Ensure that a hole is not generated on the player's starting position or the hat's position.
        newHoleCoordinates[0] = Math.floor(Math.random()*height);
        newHoleCoordinates[1] = Math.floor(Math.random()*width);
      }
      newField[newHoleCoordinates[0]][newHoleCoordinates[1]] = characters.hole;
      newHoleCoordinates[0] = 0;
      newHoleCoordinates[1] = 0;
      currentHoles++;
    }


    return newField;
  }
}

// Function for Moving Player on the Field //
const movePlayer = (coordinates, direction, field) => { // Move player on the field in a specified direction.

  if (!direction.match(/^[uldr]$/)) { // Check for proper character input
    console.log('Invalid input! Enter u, l, d, or r for up, left, down, right, respectively.')
    return coordinates;
  }

  if ((direction === 'u' && coordinates[0] === 0) || // Check if player is trying to move up while already at top edge of field.
      (direction === 'l' && coordinates[1] === 0) || // Check if player is trying to move left while already at left edge of field.
      (direction === 'd' && coordinates[0] === height-1) || // Check if player is trying to move down while already at bottom edge of field.
      (direction === 'r' && coordinates[1] === width-1)) { // Check if player is trying to move right while already at right edge of field.
    console.log('You\'re at the edge of the field and can\'t move in that direction!');
    return coordinates;
  }

  switch (direction) {
    case 'u':
      field.adjustSpace(coordinates, 'path');
      coordinates[0]--;
      [onHat, onHole] = field.checkStatus(coordinates);
      field.adjustSpace(coordinates, 'player');
      console.log('Moved up.');
      return coordinates;
    case 'l':
      field.adjustSpace(coordinates, 'path');
      coordinates[1]--;
      [onHat, onHole] = field.checkStatus(coordinates);
      field.adjustSpace(coordinates, 'player');
      console.log('Moved left.');
      return coordinates;
    case 'd':
      field.adjustSpace(coordinates, 'path');
      coordinates[0]++;
      [onHat, onHole] = field.checkStatus(coordinates);
      field.adjustSpace(coordinates, 'player');
      console.log('Moved down.');
      return coordinates;
    case 'r':
      field.adjustSpace(coordinates, 'path');
      coordinates[1]++;
      [onHat, onHole] = field.checkStatus(coordinates);
      field.adjustSpace(coordinates, 'player');
      console.log('Moved right.');
      return coordinates;
  }
}

//// Game Setup ////
console.clear();
console.log('*** Welcome to Find Your Hat! ***\n');
console.log('What size of field would you like to play on?');
let width = parseInt(prompt('> Width: '));
let height = parseInt(prompt('> Height: '));
console.log('What level of difficulty do you want to play at? Select a number between 1 and 5;');
let difficulty = parseInt(prompt('> '));
const field = new Field(Field.generateField(width, height, difficulty));

// All coordinates match Field nested array structure. Origin is at top left. First number represents position on vertical axis, with the positive direction being down. Second number represents position on horizontal axis, with positive direction being right.
let playerCoordinates = [0, 0];

//// Gameplay ////
console.clear();
console.log('*** Welcome to Find Your Hat! ***\n\n\n');
field.print();
console.log();
console.log('Which direction would you like to move?');
direction = prompt('> ');

while (!gameEnd) {
  console.clear()
  console.log('*** Welcome to Find Your Hat! ***\n');
  playerCoordinates = movePlayer(playerCoordinates, direction, field);
  console.log();
  field.print();
  console.log();
  if (onHat) {
    console.log('You found your hat! Nice work!\n')
    gameEnd = true;
  } else if (onHole) {
    console.log('You\'ve fallen into a hole!\n');
    console.log('*** GAME OVER ***\n');
    gameEnd = true;
  } else {
    console.log('Which direction would you like to move?');
    direction = prompt('> ');
  }
}

/*
// TESTING FIELD GENERATION PROCESS
console.clear();
console.log('What size of field would you like to play on?');
let width = parseInt(prompt('> Width: '));
let height = parseInt(prompt('> Height: '));
console.log('What level of difficulty do you want to play at? Select a number between 1 and 5;');
let difficulty = parseInt(prompt('> '));
const field = [];
for (let i = 0; i<20; i++) {
  field[i] = new Field(Field.generateField(width, height, difficulty));
  field[i].print();
  console.log('\n');
}
*/