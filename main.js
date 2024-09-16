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

const movePlayer = (coordinates, direction) => { // Moving the player on the field in a specified direction.
  if (!direction.match(/^[uldr]$/)) {
    console.log('Invalid input! Enter u, l, d, or r for up, left, down, right, respectively.')
    return;
  }

  switch (direction) {
    case 'u':
      console.log('Moving up...');
      break;
    case 'l':
      console.log('Moving left...');
      break;
    case 'd':
      console.log('Moving down...');
      break;
    case 'r':
      console.log('Moving right...');
  }
}

const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

let direction;

//// Handling Gameplay ////

let coordinates = [0,0];

console.log();
myField.print();
console.log();
console.log('Which direction would you like to move?');
direction = prompt('> ');
movePlayer(coordinates, direction);
console.log();