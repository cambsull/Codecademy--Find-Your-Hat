/* "Find Your Hat" challenge
Create a board utilizing the provided characters that accepts user input to move the player character along a path until they either

move out of bounds, fall into a hole, or find their hat.

Notes: This works, however there are several ways it can be improved in the future:

- Currently the userMoves() method handles pretty much everything, which could be improved by creating more methods to check for
hole and hat position in order to create better separation of concerns.

- The game can generate maps that are impossible to solve, such as trapping the player between holes at the start of the game. To
solve this would probably require a maze-solving algorithm, which is something I may return to and implement in the future.

-Currently there's no functionality to start a new game short of running the file again. Would be fairly trivial to remedy.

-Could spruce this up wtih other packages that do things like launching the game in a window or utilizing icons for better graphics.

-Could add functionality to set a percentage of holes in order to change difficulty. */

const prompt = require("prompt-sync")({ sigint: true });
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  constructor(field) {
    //Initialize with a field argument to pass in the static generateField method, variables to hold player position and a variable to hold the game state.
    this.field = field;
    this.playerx = 0;
    this.playery = 0;
    this.playGame = 1;

  }
  //Display the current map and player position as a set of coordinates.
  logField() {
    for (let i = 0; i < this.field.length; i++) {
      console.log(this.field[i].join(""));
    }
    console.log(`Current position: ${this.playery}, ${this.playerx}`);
  }
  //Update the map, handle movement, detect if the player is moving into a hole, the hat, or out of bounds and responding accordingly.
  userMoves() {
    this.logField();
    let direction = prompt("Input a direction: ").toLowerCase();

    switch (direction) {
      case "up":
        if (this.playery - 1 < 0) {
          console.log("Out of bounds!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery - 1][this.playerx] === hole) {
          console.log("You fell into a hole!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery - 1][this.playerx] === hat) {
          console.log("You found the hat! Good job!");
          this.playGame = 0;
          break;
        } else {
          this.playery--;
          this.field[this.playery][this.playerx] = pathCharacter;
          this.logField();
          break;
        }
      case "down":
        if (this.playery + 1 > this.field.length - 1) {
          console.log("Out of bounds!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery + 1][this.playerx] === hole) {
          console.log("You fell into a hole!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery + 1][this.playerx] === hat) {
          console.log("You found the hat! Good job!");
          this.playGame = 0;
          break;
        } else {
          this.playery++;
          this.field[this.playery][this.playerx] = pathCharacter;
          this.logField();
          break;
        }
      case "left":
        if (this.playerx - 1 < 0) {
          console.log("Out of bounds!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery][this.playerx - 1] === hole) {
          console.log("You fell into a hole!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery][this.playerx - 1] === hat) {
          console.log("You found the hat! Good job!");
          this.playGame = 0;
          break;
        } else {
          this.playerx--;
          console.log(this.playerx);
          break;
        }
      case "right":
        if (this.playerx + 1 > this.field[0].length - 1) {
          console.log("Out of bounds!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery][this.playerx + 1] === hole) {
          console.log("You fell into a hole!");
          this.playGame = 0;
          break;
        } else if (this.field[this.playery][this.playerx + 1] === hat) {
          console.log("You found the hat! Good job!");
          this.playGame = 0;
          break;
        } else {
          this.playerx++;
          console.log(this.playerx);
          this.field[this.playery][this.playerx] = pathCharacter;
          this.logField();
          break;
        }
      default:
        console.log("Invalid direction.");
        break;
    }
  }
  //Simple toggle to determine if the while loop should be exited.
  isPlaying() {
    if (this.playGame === 1) {
      this.userMoves();
    }
  }
  //Static method to generate a random field, passed in as the argument for the Field object.
  static generateField(height, width) {
    let containerArray = [];
    let possibleChar = [fieldCharacter, fieldCharacter, fieldCharacter, hole];
    let hatPositionHeight, hatPositionWidth;

    //Ensure that the hat is not generated on [0][0]
    do {
        hatPositionHeight = Math.floor(Math.random() * height);
        hatPositionWidth = Math.floor(Math.random() * width);
      } while (hatPositionHeight === 0 && hatPositionWidth === 0);

    //Create subarrays filled with the width number of elements each and push the height number of arrays to the containerArray.
    for (let k = 0; k < height; k++) {
      let subArray = [];
      for (let j = 0; j < width; j++) {
        let randomChar =
          possibleChar[Math.floor(Math.random() * possibleChar.length)];
        subArray.push(randomChar);
      }
      containerArray.push(subArray);
    }
    containerArray[0][0] = pathCharacter;
    containerArray[hatPositionHeight][hatPositionWidth] = hat;

    return containerArray;
  }
}

const myField = new Field(Field.generateField(5, 5)); //Height and width can be changed to alter shape of map.

while (myField.playGame === 1) {
  myField.isPlaying();
}
