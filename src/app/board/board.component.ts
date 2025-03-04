import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss'],
    standalone: false
})

export class BoardComponent implements OnInit {
  squares: string[] | undefined;
  xIsNext: boolean | undefined;
  isBoardDisabled = false;
  snackbarRef: any;

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.snackbarRef && this.snackbarRef.dismiss();
    this.isBoardDisabled = false;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (this.isBoardDisabled) {
      return;
    }

    if (this.squares && !this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        this.squares &&
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        this.snackbarRef = this._snackBar.open(
          `Player ${this.squares[a]} won the game!`,
          'OK'
        );
        this.isBoardDisabled = true;
      }
    }
    return null;
  }
}
