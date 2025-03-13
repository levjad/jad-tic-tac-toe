import {Component, OnInit, signal} from '@angular/core';
import {AiOpponent} from "../ai/ai-opponent";

@Component({
    selector: 'jad-board',
    template: `
      <section class="flex items-center mt-6">
        <div class="flex gap-1">
          <svg-x [width]="20" [height]="20"/>
          <svg-o [width]="20" [height]="20"/>
        </div>

        <button class="btn btn-soft btn-sm">
          @if (this.player === 'x') {
            <svg-x [strokeColor]="'stroke-gray-500'" [width]="15" [height]="15"/>
          } @else {
            <svg-o [strokeColor]="'stroke-gray-500'" [width]="15" [height]="15"/>
          }
          <span class="font-semibold text-xs">TURN</span>
        </button>
        <span class="flex justify-end">
            <button class="btn btn-soft bg-gray-300 text-base-100 hover:bg-gray-400 btn-sm w-4 px-4"
                    (click)="newGame()">&#8635;</button>
        </span>
      </section>
      <main class="max-w-lg">
        @for (val of squares; track idx; let idx = $index) {
          <jad-square
            [value]="val"
            [currentPlayer]="this.player"
            (click)="makeMove(idx)">
          </jad-square>
        }
      </main>
      <section class="mt-2">
        <div class="card bg-accent text-base-100 card-xs justify-center">
          <div class="flex flex-col justify-center items-center p-2">
            <h1 class="text-xs font-semibold">X (PLAYER)</h1>
            <p class="font-bold">{{ playerWon() }}</p>
          </div>
        </div>
        <div class="card bg-gray-300 text-base-100 card-xs justify-center">
          <div class="flex flex-col p-2 justify-center items-center">
            <h1 class="text-xs font-semibold">TIES</h1>
            <p class="font-bold">{{ ties() }}</p>
          </div>
        </div>
        <div class="card bg-warning text-base-100 card-xs justify-center">
          <div class="flex flex-col p-2 justify-center items-center">
            <h1 class="text-xs font-semibold">O (CPU)</h1>
            <p class="font-bold">{{ cpuWon() }}</p>
          </div>
        </div>
      </section>
      @let winner = this.winner();
      @if (!!winner) {
        <div class="flex absolute bg-black bg-opacity-25 h-full w-full justify-center items-center">
          <div role="alert" class="alert w-48">
            <span class="flex gap-2 justify-center items-center">
                @if (winner === 'x') {
                  <svg-x [width]="15" [height]="15"/>
                  <span class="font-semibold text-xs">won the game!</span>
                }
                @if(winner === 'o') {
                  <svg-o [width]="15" [height]="15"/>
                  <span class="font-semibold text-xs">won the game!</span>
                }
                @if(winner === 'draw') {
                  <span class="font-semibold text-xs">Draw!</span>
                }
            </span>
            <div>
              <button class="btn btn-soft bg-gray-300 text-base-100 hover:bg-gray-400 btn-sm w-4 px-4"
                      (click)="newGame()">&#8635;
              </button>
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
  winner = signal<string | null>(null);
  playerWon = signal<number>(0);
  ties = signal<number>(0);
  cpuWon = signal<number>(0);
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
    if (this.winner()) {
      switch (this.winner()) {
        case 'x':
          this.playerWon.update(value => value + 1);
          break;
        case 'o':
          this.cpuWon.update(value => value + 1);
          break;
        case 'draw':
          this.ties.update(value => value + 1);
      }
    }
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.isBoardDisabled = false;
    this.winner.set(null);
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
      setTimeout(() => this.aiMove(), 200);
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
        this.winner.set(this.squares[a]);
        this.isBoardDisabled = true;
        return this.squares[a];
      }
    }

    if (this.squares && this.squares.every(square => square !== null)) {
      this.winner.set('draw');
      this.isBoardDisabled = true;
      return 'draw';
    }

    return null;
  }
}
