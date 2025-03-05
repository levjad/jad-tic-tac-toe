import {Component, OnInit, signal} from '@angular/core';
import {AiOpponent} from "../ai/ai-opponent";

@Component({
    selector: 'jad-board',
    template: `
      <section class="flex items-center mt-6">
        <div class="flex gap-1">
          <svg-x [width]="20" [height]="20" />
          <svg-o [width]="20" [height]="20" />
        </div>

        <button class="btn btn-soft btn-sm">
          @if(this.player === 'x') {
            <svg-x [strokeColor]="'stroke-gray-500'" [width]="15" [height]="15" />
          } @else {
            <svg-o [strokeColor]="'stroke-gray-500'" [width]="15" [height]="15" />
          }
          <span class="font-semibold text-xs">TURN</span>
        </button>
        <span class="flex justify-end">
            <button class="btn btn-soft bg-gray-300 text-base-100 hover:bg-gray-400 btn-sm w-4 px-4" (click)="newGame()">&#8635;</button>
        </span>
      </section>
      <main class="max-w-lg">
        @for(val of squares; track idx; let idx = $index) {
          <jad-square
            [value]="val"
            [currentPlayer]="this.player"
            (click)="makeMove(idx)">
          </jad-square>
        }
      </main>
      @let winner = this.playerWon();
      @if (!!winner) {
        <div>
          <div role="alert" class="alert">
            <span class="flex gap-2 justify-center items-center">
                @if(winner === 'x') {
                  <svg-x [width]="15" [height]="15" />
                } @else {
                  <svg-o [width]="15" [height]="15" />
                }
              <span class="font-semibold text-xs">won the game!</span>
            </span>
            <div>
              <button class="btn btn-soft bg-gray-300 text-base-100 hover:bg-gray-400 btn-sm w-4 px-4" (click)="newGame()">&#8635;</button>
            </div>
          </div>
        </div>
      }
    `,
    styles: `
      main, section {
        display: grid;
        grid-template-columns: 8rem 8rem 8rem;
        grid-gap: .5rem;
      }

      jad-square {
        border: 1px transparent solid;
        height: 8rem;
      }
    `,
    standalone: false
})

export class BoardComponent implements OnInit {
  playerWon = signal<string | null>(null);
  squares: string[] | undefined;
  xIsNext: boolean | undefined;
  isBoardDisabled = false;
  ai: AiOpponent;
  aiRandomness = 0.2;

  constructor() {
    this.ai = new AiOpponent('o', 'x');
  }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.isBoardDisabled = false;
    this.playerWon.set(null);
  }

  get player() {
    return this.xIsNext ? 'x' : 'o';
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
    if (!this.isBoardDisabled && this.player === 'o') {
      setTimeout(() => this.aiMove(), 500);
    }
  }

  aiMove() {
    if (this.squares) {
      const bestMove = this.ai.getBestMoveWithRandomness(this.squares, this.aiRandomness, this.calculateWinner.bind(this));
      if (bestMove !== null) {
        this.makeMove(bestMove);
      }
    }
  }

  calculateWinner(): string | null {
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
        this.playerWon.set(this.squares[a]);
        this.isBoardDisabled = true;
        return this.squares[a];
      }
    }
    return null;
  }
}
