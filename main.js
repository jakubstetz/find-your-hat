const prompt = require('prompt-sync')();

const characters = {
  hat: '^',
  hole: 'O',
  field: '░',
  path: '*'
}

class Field {
  constructor(input) { // input represents the field.
    this.field = input;
  }

  print() { // Print the field.
    for (const row of this.field) console.log(row.join(''));
  }
}

const movePlayer = (coordinates, direction) => { // Move player on the field in a specified direction.

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
      console.log('Moving up...');
      coordinates[0]--
      return coordinates;
    case 'l':
      console.log('Moving left...');
      coordinates[1]--
      return coordinates;
    case 'd':
      console.log('Moving down...');
      coordinates[0]++
      return coordinates;
    case 'r':
      console.log('Moving right...');
      coordinates[1]++
      return coordinates;
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

let direction;

//// Handling Gameplay ////

let playerCoordinates = [0, 0]; // Matching Field nested array structure. Origin is at top left. First number represents position on vertical axis, with the positive direction being down. Second number represents position on horizontal axis, with positive direction being right.

console.log();
myField.print();
console.log();
console.log('Which direction would you like to move?');
direction = prompt('> ');
playerCoordinates = movePlayer(playerCoordinates, direction);
console.log();