
class Game {

  constructor(playerOneColor, playerTwoColor, width = 7, height = 6,) {
    this.player = [1,2]
    this.playerOneColor = playerOneColor;
    this.playerTwoColor = playerTwoColor;
    this.width = width;
    this.height = height;
    this.currPlayer = this.player[0];
    this.board = [];
    this.makeBoard();
    this.makeHtmlBoard();
  }

  makeBoard() {
    console.log(this.playerOneColor)
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    const board = document.getElementById('board');

    const top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    top.addEventListener('click', this.handleClick.bind(this));

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }

    board.append(top);

    for (let y = 0; y < this.height; y++) {
      const row = document.createElement('tr');

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }

      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');

    piece.style.backgroundColor = this.currPlayer === 1 ? this.playerOneColor.color : this.playerTwoColor.color;

    piece.style.top = -50 * (y + 2);

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    alert(msg);
    const top = document.querySelector("#column-top");
    top.removeEventListener("click",this.handleClick);

  }

  handleClick(evt) {
   
    const x = +evt.target.id;

    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    
    if (this.checkForWin()) {
     
      return this.endGame(`Player ${this.currPlayer} won!`);
    }
    
    if (this.board.every(row => row.every(cell => cell))) {
      return this.endGame('Tie!');
    }
      
    this.currPlayer = this.currPlayer === this.player[0] ? this.player[1] : this.player[0];
  }

  checkForWin() {
    
    const _win = cells => {
    
      return cells.every(
        ([y, x]) =>
    
          y >= 0 &&
          y < this.height &&
          x >= 0 &&
          x < this.width &&
          this.board[y][x] === this.currPlayer
      );

    }
  
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {

        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player {
  constructor(color) {
    this.color = color;
  }
}

let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let btn = document.querySelector("button");

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  new Game(new Player(p1.value), new Player(p2.value));
  p1.value = "";
  p2.value = "";
});
